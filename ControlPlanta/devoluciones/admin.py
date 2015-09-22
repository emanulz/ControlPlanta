# -*- coding: utf-8 -*-

from django.contrib import admin

# Register your models here.
from devoluciones.models import Devolucion, DetalleDev


@admin.register(Devolucion)
class devolucionadmin(admin.ModelAdmin):
    list_display = ('id','venta','notacredito')
    search_fields = ('id','venta','notacredito' )
    #filter_horizontal = ('detalledevolucion',)

@admin.register(DetalleDev)
class detalledevadmin(admin.ModelAdmin):
    list_display = ('id','producto','peso','colones')
