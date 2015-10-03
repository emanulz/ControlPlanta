# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Cotizacion, DetalleProductosCoti


@admin.register(Cotizacion)
class cotizacionadmin(admin.ModelAdmin):
    #list_display =('id','')
    list_display = ('id','client','nombrecliente','total','date','cashier')
    #list_display = ('id', 'ticketnum','client','nombrecliente','cashier','date','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos','datosdelpago')
    # list_filter = ('name','identification')
    search_fields = ('id','client__name','client__last_name','cashier__name','date' )
    filter_horizontal = ('detalleproductos',)

@admin.register(DetalleProductosCoti)
class DetalleProductosCotiAdmin(admin.ModelAdmin):
    list_display = ('id','producto','description','preciouni','cantidad','useiv','total',)
    search_fields = ('producto','preciouni','cantidad')

    def useiv(self, obj):
        return obj.iv

    useiv.admin_order_field = 'iv'
    useiv.boolean = True
    useiv.short_description = "Usa I.V?"