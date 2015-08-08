from django.contrib import admin

# Register your models here.
from cuentasCobrar.models import Abonos


@admin.register(Abonos)
class AbonosAdmin(admin.ModelAdmin):
    list_display = ('id','cliente','date', 'time', 'detalle', 'monto', 'saldoant', 'saldoreal')
    filter_horizontal = ('facturas',)
    search_fields = ('id','cliente__name', 'cliente__last_name','date')

