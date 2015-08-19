from django.contrib import admin

# Register your models here.
from inventariosMP.models import ResumenInventarioMP, EntradasInventarioMP, TiposEntradasMP, SalidasInventarioMP, \
    TiposSalidasMP


@admin.register(ResumenInventarioMP)
class ResumenInvAdmin(admin.ModelAdmin):
    list_display = ('id', 'materiaprima', 'cantidad', )
    search_fields = ('id', 'materiaprima', 'cantidad')

@admin.register(EntradasInventarioMP)
class EntradasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','materiaprima', 'peso','nuevopeso','date','time','usuario' )
    search_fields = ('id','tipo__nombre','datos' ,'materiaprima__description', 'peso','date','time','usuario__name')

@admin.register(TiposEntradasMP)
class TiposEntradasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)

@admin.register(SalidasInventarioMP)
class SalidasInvAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','datos','materiaprima', 'peso','nuevopeso','date','time','usuario' )
    search_fields = ('id','tipo__nombre','datos', 'materiaprima__description', 'peso','date','time','usuario__name')

@admin.register(TiposSalidasMP)
class TiposSalidasAdmin(admin.ModelAdmin):
    list_display = ('id','nombre', )
    search_fields = ('nombre',)