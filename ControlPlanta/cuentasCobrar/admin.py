from django.contrib import admin

# Register your models here.
from cuentasCobrar.models import Abono,DetalleCuenta, NotaDeCredito


@admin.register(Abono)
class AbonosAdmin(admin.ModelAdmin):
    list_display = ('id','date', 'time', 'detalle', 'montocol','montodolar', 'saldoant', 'saldoactual')
    filter_horizontal = ('facturas',)
    search_fields = ('id','date')

@admin.register(DetalleCuenta)
class DetalleCuentaAdmin(admin.ModelAdmin):
    list_display = ('id','cliente','total')
    search_fields = ('id','cliente__name','total')
    filter_horizontal = ('pending', 'abonos')

@admin.register(NotaDeCredito)
class NotaDeCredito(admin.ModelAdmin):
    list_display = ('id','date','time','monto','saldoanterior','saldoactual')
    search_fields = ('id','date','time','monto','saldoanterior','saldoactual')
