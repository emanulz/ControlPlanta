# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Venta, DetalleProductos, DetallesPago, TiposPago, Tipostarjeta


@admin.register(Venta)
class ventaadmin(admin.ModelAdmin):

    def buttonEdit(self, obj):
        return '<input id="%s" type="button" class="buttonEdit btn btn-info" value="Editar">' % obj.id

    buttonEdit.short_description = 'Editar'
    buttonEdit.allow_tags = True

    list_display = ('id', 'buttonEdit', 'nombrecliente', 'total', 'date')
    search_fields = ('id','client__name','client__last_name','cashier__name','date' )
    filter_horizontal = ('detalleproductos',)

    class Media:

        js = ("../static/myAdmin/editarVenta.js",
              )

@admin.register(DetalleProductos)
class DetalleProductosAdmin(admin.ModelAdmin):
    list_display = ('id','producto','description','preciouni','cantidad','useiv','total',)
    search_fields = ('id', 'producto__id','preciouni','cantidad')

    def useiv(self, obj):
        return obj.iv

    useiv.admin_order_field = 'iv'
    useiv.boolean = True
    useiv.short_description = "Usa I.V?"

@admin.register(DetallesPago)
class DetallesPagoAdmin(admin.ModelAdmin):
    list_display = ('id','tipopago','montoefectivo','vuelto','tarjeta','digitos','autorizacion')
    search_fields = ('id',)

@admin.register(TiposPago)
class TiposPagoAdmin(admin.ModelAdmin):
    list_display = ('id','nombre')
    search_fields = ('id','nombre')

@admin.register(Tipostarjeta)
class TipostarjetaAdmin(admin.ModelAdmin):
    list_display = ('id','nombre')
    search_fields = ('id','nombre')