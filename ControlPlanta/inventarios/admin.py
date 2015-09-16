from django.contrib import admin

# Register your models here.
from inventarios.models import InventarioTotal,ResumenInventario,EntradasInventario,TiposEntradas,SalidasInventario,TiposSalidas
from productos.models import Producto


# @admin.register(InventarioTotal)
# class InvTotalAdmin(admin.ModelAdmin):
#     list_display = ('id', 'producto', 'peso', 'lote','vencimiento')
#     search_fields = ('id', 'lote', 'vencimiento')


@admin.register(ResumenInventario)
class ResumenInvAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'cantidad', )
    search_fields = ('id', 'producto', 'cantidad')

@admin.register(EntradasInventario)
class EntradasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','producto', 'peso','nuevopeso','date','time','usuario' )
    search_fields = ('id','tipo__nombre','datos' ,'producto__description', 'peso','date','time','usuario__name')

@admin.register(TiposEntradas)
class TiposEntradasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)

@admin.register(SalidasInventario)
class SalidasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','producto', 'peso','nuevopeso','date','time','usuario' )
    search_fields = ('id','tipo__nombre','datos', 'producto__description', 'peso','date','time','usuario__name')

@admin.register(TiposSalidas)
class TiposSalidasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)