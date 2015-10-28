from django.contrib import admin

# Register your models here.
from inventarios.models import InventarioTotal,ResumenInventario,EntradasInventario,TiposEntradas,SalidasInventario,TiposSalidas
from productos.models import Producto


# @admin.register(InventarioTotal)
# class InvTotalAdmin(admin.ModelAdmin):
#     list_display = ('id', 'producto', 'peso', 'lote','vencimiento')
#     search_fields = ('id', 'lote', 'vencimiento')



@admin.register(EntradasInventario)
class EntradasInvAdmin(admin.ModelAdmin):
    list_display = ('id','ainventario','tipo','producto','pesoanterior', 'peso','nuevopeso','date','time' )
    search_fields = ('id','ainventario','tipo__nombre' ,'producto__description', 'peso','date','time')

@admin.register(TiposEntradas)
class TiposEntradasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)

@admin.register(SalidasInventario)
class SalidasInvAdmin(admin.ModelAdmin):
    list_display = ('id','ainventario','tipo','producto', 'pesoanterior','peso','nuevopeso','date','time' )
    search_fields = ('id','ainventario','tipo__nombre', 'producto__description', 'peso','date','time')

@admin.register(TiposSalidas)
class TiposSalidasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)