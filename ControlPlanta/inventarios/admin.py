from django.contrib import admin

# Register your models here.
from inventarios.models import InventarioTotal


@admin.register(InventarioTotal)
class InvTotalAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'peso', 'lote','vencimiento')
    search_fields = ('id', 'lote', 'vencimiento')