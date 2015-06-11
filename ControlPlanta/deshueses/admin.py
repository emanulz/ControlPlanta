from django.contrib import admin
from deshueses.models import Deshuese, DetalleDeshuese

# Register your models here.

@admin.register(Deshuese)
class lotesadmin(admin.ModelAdmin):
    list_display = ('id', 'lote', 'pesototal', 'pesototallote', 'mermakg','mermapor' )
    search_fields = ('id', 'lote')
    filter_horizontal = ('productos',)

@admin.register(DetalleDeshuese)
class DestalleAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'peso', 'lote')
    search_fields = ('id', 'lote')
