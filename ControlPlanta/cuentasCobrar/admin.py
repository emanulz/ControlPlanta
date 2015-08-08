from django.contrib import admin

# Register your models here.
from cuentasCobrar.models import Abonos,DetalleCuenta


@admin.register(Abonos)
class AbonosAdmin(admin.ModelAdmin):
    list_display = ('id','date', 'time', 'detalle', 'monto', 'saldoant', 'saldoreal')
    filter_horizontal = ('facturas',)
    search_fields = ('id','date')

@admin.register(DetalleCuenta)
class DetalleCuentaAdmin(admin.ModelAdmin):
    list_display = ('id','cliente','total')
    search_fields = ('id','cliente','total')

