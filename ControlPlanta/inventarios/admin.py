from django.contrib import admin

# Register your models here.
from inventarios.models import InventarioTotal,ResumenInventario,EntradasInventario,TiposEntradas,SalidasInventario,TiposSalidas


@admin.register(InventarioTotal)
class InvTotalAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'peso', 'lote','vencimiento')
    search_fields = ('id', 'lote', 'vencimiento')

@admin.register(ResumenInventario)
class ResumenInvAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'cantidad', )
    search_fields = ('id', 'producto', 'cantidad')

@admin.register(EntradasInventario)
class EntradasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','producto', 'peso','date','time' )
    search_fields = ('id','tipo','datos' 'producto', 'peso','date','time')

@admin.register(TiposEntradas)
class TiposEntradasAdmin(admin.ModelAdmin):
    list_display = ('nombre', )
    search_fields = ('nombre',)

@admin.register(SalidasInventario)
class SalidasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','producto', 'peso','date','time' )
    search_fields = ('id','tipo','datos' 'producto', 'peso','date','time')

@admin.register(TiposSalidas)
class TiposSalidasAdmin(admin.ModelAdmin):
    list_display = ('nombre', )
    search_fields = ('nombre',)