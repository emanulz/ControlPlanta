from django.contrib import admin
from deshueses.models import Deshuese, DetalleDeshuese

# Register your models here.

@admin.register(Deshuese)
class Deshueseadmin(admin.ModelAdmin):
    list_display = ('id', 'lote', 'date', 'pesototal', 'pesototallote', 'mermakg', 'desechokg', 'mermapor')
    search_fields = ('id', 'lote')
    filter_horizontal = ('detalle',)

@admin.register(DetalleDeshuese)
class DestalleAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'peso', 'lote')
    search_fields = ('id', 'lote')
