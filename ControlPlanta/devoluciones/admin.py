# -*- coding: utf-8 -*-

from django.contrib import admin

# Register your models here.
from devoluciones.models import Devolucion, DetalleDev


@admin.register(Devolucion)
class devolucionadmin(admin.ModelAdmin):
    list_display = ('id','venta','cliente','totalcolones')
    search_fields = ('id','venta','totalcolones','cliente__name','cliente__last_name' )
    #filter_horizontal = ('detalledevolucion',)

@admin.register(DetalleDev)
class detalledevadmin(admin.ModelAdmin):
    list_display = ('id','producto','peso','colones')
