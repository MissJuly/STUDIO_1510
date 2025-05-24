from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    ProductViewSet,
    NotifyRequestCreateView,
    CartView,
    AddToCartView,
    RemoveFromCartView,
    ClearCartView,
    OrderCreateView,
    CheckoutView,
    StartProjectView,
    ContactUsView
)

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='project')
router.register('products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),



    # Cart endpoints
    path('cart/', CartView.as_view(), name='cart-detail'),
    path('cart/add/', AddToCartView.as_view(), name='cart-add'),
    path('cart/remove/', RemoveFromCartView.as_view(), name='cart-remove'),
    path('cart/clear/', ClearCartView.as_view(), name='cart-clear'),

    # Notify
    path('notify/', NotifyRequestCreateView.as_view(), name='notify-create'),

    # Orders
    path('orders/', OrderCreateView.as_view(), name='order-create'),

    # Checkout
    path('checkout/', CheckoutView.as_view(), name='checkout'),

    # StartProject
    path('start-project/', StartProjectView.as_view(), name='start_project_submission'),

    # Contactus
     path('contact-us/', ContactUsView.as_view(), name='contact-us'),
]
