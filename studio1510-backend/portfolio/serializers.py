from rest_framework import serializers
from .models import Project, Product, NotifyRequest, Cart, CartItem, Order, OrderItem, ProjectImage

class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = ProjectImage
        fields = ['image']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'created_at', 'images']


class ProductSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(default=1, required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'available', 'created_at', 'image', 'quantity']


class NotifyRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotifyRequest
        fields = ['id', 'product', 'email', 'created_at']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # nested product data

    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'created_at', 'updated_at', 'items']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        cart = Cart.objects.create(**validated_data)

        for item_data in items_data:
            CartItem.objects.create(cart=cart, **item_data)

        return cart

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)

        # Update Cart fields (if any, even though in this case none)
        super().update(instance, validated_data)

        if items_data is not None:
            # Clear old items (you could optimize this later to "diff and update" instead of clearing)
            instance.items.all().delete()

            for item_data in items_data:
                CartItem.objects.create(cart=instance, **item_data)

        return instance

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']



class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
