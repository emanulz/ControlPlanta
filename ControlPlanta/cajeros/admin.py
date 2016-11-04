from django.contrib import admin

# Register your models here.
from cajeros.models import Cajero, Vendedor


@admin.register(Cajero)
class CajeroAdmin(admin.ModelAdmin):
    list_display = ('id','name','last_name','identification','user')
    search_fields = ('id', 'name', 'identification', 'user')


@admin.register(Vendedor)
class VendedorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'last_name', 'identification')
    search_fields = ('id', 'name', 'identification')
