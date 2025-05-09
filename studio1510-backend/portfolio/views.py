from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Product
from .serializers import ProjectSerializer, ProductSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    lookup_field = 'id'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = ['available']  # Enable filtering by availability
    search_fields = ['name', 'description']  # Enable search by name/description
    ordering_fields = ['price', 'created_at']  # Enable ordering by price/date
    ordering = ['-created_at']  # Default ordering (newest first)
