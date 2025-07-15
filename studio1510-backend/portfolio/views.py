from rest_framework import viewsets, filters, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Product, NotifyRequest, Cart, CartItem, Order, OrderItem, ProjectInquiry, ContactInquiry
from .serializers import ProjectSerializer, ProductSerializer, NotifyRequestSerializer, CartSerializer, CartItemSerializer, OrderSerializer
import uuid, json

# --- PROJECTS & PRODUCTS ---

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    lookup_field = 'id'

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['available']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

class NotifyRequestCreateView(generics.CreateAPIView):
    queryset = NotifyRequest.objects.all()
    serializer_class = NotifyRequestSerializer

# --- CART HELPERS ---

def get_or_create_cart(request):
    # Make sure the session has a session_key
    if not request.session.session_key:
        request.session.create()
        # cart.items.count()

    session_key = request.session.session_key

    try:
        cart = Cart.objects.get(session_key=session_key)
        print(f"Found existing cart for session: {session_key}")
    except Cart.DoesNotExist:
        cart = Cart.objects.create(session_key=session_key)
        print(f"Created new cart for session: {session_key}")

    return cart


def add_item_to_cart(request, product_id, quantity):
    cart = get_or_create_cart(request)
    print("Session Key:", request.session.session_key)
    print("Cart items before adding:", cart.items.count())
    product = get_object_or_404(Product, id=product_id)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.price = product.price
    cart_item.save()
    print(f"Saved CartItem - cart: {cart.id}, product: {product.name}, quantity: {cart_item.quantity}")


# --- CART API VIEWS ---

class CartView(APIView):
    def get(self, request):
        cart = get_or_create_cart(request)
        print("Fetched cart items count:", cart.items.count())
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        product_id = request.data.get('productId')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        add_item_to_cart(request, product_id, quantity)
        return Response({"message": "Item added to cart"}, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch')
class AddToCartView(APIView):
    def post(self, request):
        product_id = request.data.get('product') or request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        add_item_to_cart(request, product_id, quantity)
        return Response({'message': 'Item added/updated'}, status=status.HTTP_200_OK)

class RemoveFromCartView(APIView):
    def post(self, request):
        product_id = request.data.get('productId')
        print("Received data:", request.data)

        if not product_id:
            return Response({"error": "Missing productId"}, status=status.HTTP_400_BAD_REQUEST)

        cart = get_or_create_cart(request)
        deleted, _ = CartItem.objects.filter(cart=cart, product_id=product_id).delete()

        if deleted == 0:
            return Response({"error": "Item not found in cart"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)

class ClearCartView(APIView):
    def post(self, request):
        cart = get_or_create_cart(request)
        cart.items.all().delete()
        return Response({'message': 'Cart cleared'}, status=status.HTTP_200_OK)

# --- ORDERS ---

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


# ----CHECKOUT VIEW----

class CheckoutView(APIView):
    def post(self, request):
        session = request.session
        cart = session.get('cart', {})
        print("Cart before clearing:", cart)

        items = request.data.get('items', [])
        if not items:
            return Response({'detail': 'Cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create()
        for item in items:
            try:
                product = Product.objects.get(id=item['product_id'])
            except Product.DoesNotExist:
                return Response({'detail': f"Product ID {item['product_id']} not found."}, status=status.HTTP_404_NOT_FOUND)

            quantity = item.get('quantity', 1)
            if product.quantity < quantity:
                return Response({'detail': f"Not enough stock for {product.name}."}, status=status.HTTP_400_BAD_REQUEST)

            # Save OrderItem
            OrderItem.objects.create(
                order=order,
                product_name=product.name,
                quantity=quantity,
                price=product.price,
            )

            # Update stock
            product.quantity -= quantity
            if product.quantity == 0:
                product.available = False
            product.save()

        # Clear cart items from Cart model (not session)
        try:
            cart = Cart.objects.get(session_key=request.session.session_key)
            cart.items.all().delete()
            print("Cart cleared from Cart model.")
        except Cart.DoesNotExist:
            print("No cart found to clear.")

        return Response({
            'message': 'Checkout successful.',
            'order_id': str(uuid.uuid4())[:8],
            'total': sum([item['quantity'] * Product.objects.get(id=item['product_id']).price for item in items])
        }, status=status.HTTP_200_OK)

# Order Submission view
class SubmitOrderView(APIView):
    def post(self, request):
        data = request.data
        customer_name = data.get('customer_name')
        customer_email = data.get('customer_email')
        customer_phone = data.get('customer_phone')
        items = data.get('items', [])

        if not customer_name or not customer_phone or not customer_email or not items:
            return Response({'error': 'Missing fields'}, status=400)

        order = Order.objects.create(
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone
        )

        item_list_lines = []

        for item in items:
            product = get_object_or_404(Product, id=item['product_id'])

            # Create OrderItem using fields compatible with your model
            OrderItem.objects.create(
                order=order,
                product_name=product.name,
                quantity=item['quantity'],
                price=product.price
            )

        item_list = "\n".join(
            f"{item['quantity']} x {Product.objects.get(id=item['product_id']).name} - Ksh{Product.objects.get(id=item['product_id']).price:.2f}"
            for item in items
        )
        subject = f"🛒 New Order Received"
        message = f"🧾 New Order Details:\n\n" \
                  f"📦 New Order from {customer_name}\n" \
                  f"Email: {customer_email}\n" \
                  f"Phone: {customer_phone}\n\n" \
                  f"Items Ordered:\n{item_list}\n\n" \
                  f"Studio 1510!"

        # Email to owner
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.DEFAULT_FROM_EMAIL],
        )

         # Confirmation email to customer
        send_mail(
            "Order Confirmation - Studio 1510",
            f"Hi {customer_name},\n\nWe’ve received your order:\n\n{item_list}\n\nWe’ll be in touch soon.\n\n-Thank you for using Studio 1510!",
            settings.DEFAULT_FROM_EMAIL,
            [customer_email],
        )

        # Clear cart items after order
        cart = get_or_create_cart(request)
        cart.items.all().delete()

        return Response({'message': 'Order placed successfully'}, status=200)

# Project Inquiry view
@method_decorator(csrf_exempt, name='dispatch') # replace with CSRF token later
class StartProjectView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            project_type = data.get('project_type')
            message = data.get('message')

            inquiry = ProjectInquiry.objects.create(
                name=name,
                email=email,
                project_type=project_type,
                message=message,
            )

            # # Send notification email
            subject = f"New Project Inquiry from {name}"
            email_message = f"""
            You have received a new project inquiry:

            Name: {name}
            Email: {email}
            Project Type: {project_type}
            Message:
            {message}
            """
            send_mail(
                subject,
                email_message,
                settings.EMAIL_HOST_USER,
                ['hellostudio1510@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({'success': True, 'message': 'Inquiry submitted successfully!'})
        except Exception as e:
            print("Error in StartProjectView:", e)
            return JsonResponse({'success': False, 'error': str(e)}, status=400)


# Contact us
@method_decorator(csrf_exempt, name='dispatch')  # Replace with CSRF token later
class ContactUsView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')

            inquiry = ContactInquiry.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
            )

            # email notification to company
            subject_line = f"New Contact Inquiry from {name}"
            email_message = f"""
            You have received a new contact inquiry:

            Name: {name}
            Email: {email}
            Subject: {subject}
            Message:
            {message}
            """
            send_mail(
                subject_line,
                email_message,
                settings.EMAIL_HOST_USER,
                ['hellostudio1510@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({'success': True, 'message': 'Inquiry submitted successfully!'})

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
