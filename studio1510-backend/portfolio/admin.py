from django.contrib import admin
from .models import Project, Product


admin.site.register(Project)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'available', 'created_at')
    list_filter = ('available', 'created_at')
    search_fields = ('name', 'description')
