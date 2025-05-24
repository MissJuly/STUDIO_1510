from django.contrib import admin
from .models import Project, ProjectImage, Product, Order, OrderItem, ProjectInquiry
from django.conf import settings
from django.contrib.auth.models import User, Group


admin.site.site_header = getattr(settings, "ADMIN_SITE_HEADER", "Django administration")
admin.site.site_title = getattr(settings, "ADMIN_SITE_TITLE", "Site administration")
admin.site.index_title = getattr(settings, "ADMIN_INDEX_TITLE", "Welcome")

# Unregister default models
admin.site.unregister(User)
admin.site.unregister(Group)


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline]

admin.site.register(Project, ProjectAdmin)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'available', 'created_at')
    list_filter = ('available', 'created_at')
    search_fields = ('name', 'description')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'created_at')
    inlines = [OrderItemInline]


@admin.register(ProjectInquiry)
class ProjectInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'project_type', 'submitted_at')  # assuming you have a timestamp field
    search_fields = ('name', 'email', 'project_type')
    list_filter = ('project_type',)
    readonly_fields = ('name', 'email', 'project_type', 'message', 'submitted_at')

    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'project_type', 'message')
        }),
        ('Submission Details', {
            'fields': ('submitted_at',),
            'classes': ('collapse',),
        }),
    )

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
