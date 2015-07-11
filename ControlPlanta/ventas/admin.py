# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Venta, DetalleProductos, DetallesPago, TiposPago, Tipostarjeta


@admin.register(Venta)
class ventaadmin(admin.ModelAdmin):
    list_display = ('id','client','nombrecliente','cashier','date')
    #list_display = ('id', 'ticketnum','client','nombrecliente','cashier','date','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos','datosdelpago')
    # list_filter = ('name','identification')
    search_fields = ('id','client','cashier','date' )
    filter_horizontal = ('detalleproductos',)

@admin.register(DetalleProductos)
class DetalleProductosAdmin(admin.ModelAdmin):
    list_display = ('producto','preciouni','cantidad','useiv','total',)
    search_fields = ('producto','preciouni','cantidad')

    def useiv(self, obj):
        return obj.iv

    useiv.admin_order_field = 'iv'
    useiv.boolean = True
    useiv.short_description = "Usa I.V?"

@admin.register(DetallesPago)
class DetallesPagoAdmin(admin.ModelAdmin):
    list_display = ('tipopago','montoefectivo','vuelto','tarjeta','digitos','autorizacion')
    search_fields = ('tipopago','tarjeta','digitos','autorizacion')

@admin.register(TiposPago)
class TiposPagoAdmin(admin.ModelAdmin):
    list_display = ('id','nombre')
    search_fields = ('id','nombre')

@admin.register(Tipostarjeta)
class TipostarjetaAdmin(admin.ModelAdmin):
    list_display = ('id','nombre')
    search_fields = ('id','nombre')