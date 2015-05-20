from django.contrib import admin

# Register your models here.
from proveedores.models import Proveedor


@admin.register(Proveedor)
class proveedoradmin(admin.ModelAdmin):
    list_display = ('name','lastname','identification','provcode','fierro')
    search_fields = ('name','lastname','identification','provcode','fierro')
