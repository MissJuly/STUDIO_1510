from django.urls import path, include
from rest_framework import routers
from .views import ProjectViewSet, ProductViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
