# -*- coding: utf-8 -*-
from django.db import models


# Create your models here.
from cajeros.models import Cajero
from clientes.models import Cliente

from productos.models import Producto


class Venta(models.Model):

    #ticketnum  = models.PositiveIntegerField(unique=True,verbose_name='Factura #')
    client = models.ForeignKey(Cliente, verbose_name='Cliente')
    nombrecliente=models.CharField(max_length=255,verbose_name='Nombre en Factura')
    cashier = models.ForeignKey(Cajero, verbose_name='Cajeros')
    date=models.DateField(verbose_name='Fecha')
    time=models.TimeField(verbose_name='Hora de la venta')
    totolkilogramos=models.FloatField(verbose_name='Total Kg')
    cantidadarticulos=models.IntegerField(verbose_name='Cantidad de Artículos')
    subtotal=models.FloatField(verbose_name='Sub Total')
    iv=models.FloatField(verbose_name='I.V')
    descopor=models.FloatField(verbose_name='Descuento %')
    desctocol=models.FloatField(verbose_name='Descuento ₡')
    total=models.FloatField(verbose_name='Total ₡')
    detalleproductos = models.ManyToManyField('DetalleProductos', verbose_name='Detalle de los Productos')
    datosdelpago = models.ForeignKey('DetallesPago', verbose_name='Detalle de Pago')
    saldo=models.FloatField(default=0,verbose_name='Saldo Crédito ₡')
    anulada=models.BooleanField(default=0, verbose_name='Factura anulada?')
    devuelto=models.BooleanField(default=0, verbose_name='Con devolución?')
    connotacredito=models.BooleanField(default=0, verbose_name='Con nota crédito?')
    conabono=models.BooleanField(default=0, verbose_name='Con abono?')

    def __unicode__(self):
        ret=str(self.id)
        return ret

    class Meta:
        ordering = ['id']
        verbose_name = 'Venta'
        verbose_name_plural = '1. Ventas'

class DetalleProductos(models.Model):
    producto=models.ForeignKey(Producto,verbose_name='Producto')
    description=models.CharField(max_length=255,verbose_name='Descripción', blank=True)
    preciouni=models.FloatField(verbose_name='Precio Unitario ₡')
    cantidad=models.FloatField(verbose_name='Cantidad')
    iv=models.BooleanField(verbose_name='Usa Impuestos?')
    total=models.FloatField(verbose_name='Precio Total ₡')

    def __unicode__(self):
        ret=str(self.id)
        return ret

    class Meta:
        ordering = ['id']
        verbose_name = 'Detalle de Venta'
        verbose_name_plural = '2. Detalles de Venta'


class DetallesPago(models.Model):
    tipopago=models.ForeignKey('TiposPago',verbose_name='Tipo de Pago')
    montoefectivo=models.FloatField(null=True,verbose_name='Total de efectivo ₡')
    vuelto=models.FloatField(null=True,verbose_name='Vuelto ₡')
    tarjeta=models.ForeignKey('Tipostarjeta',verbose_name='Tipo de Tarjeta')
    digitos=models.IntegerField(null=True,verbose_name='Últimos 4 dígitos tarjeta')
    autorizacion=models.IntegerField(null=True,verbose_name='Autorización Datafono')
    transfnum=models.IntegerField(blank=True,verbose_name='Número de transferencia',default=0)
    bancotransf=models.CharField(max_length=255,verbose_name='Banco',default='Nacional',blank=True)
    chequenum=models.IntegerField(blank=True,verbose_name='Número de cheque',default=0)
    bancocheque=models.CharField(max_length=255,verbose_name='Banco',default='Nacional',blank=True)
    saldoant=models.FloatField(verbose_name='Saldo Crédito anterior ₡',default=0,blank=True)
    saldoactual=models.FloatField(verbose_name='Saldo Crédito nuevo ₡',default=0,blank=True)
    def __unicode__(self):
        ret=str(self.id)
        return ret

    class Meta:
        ordering = ['id']
        verbose_name = 'Detalle de Pago'
        verbose_name_plural = '3. Detalles de Pagos'

class TiposPago(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del Tipo de Pago')

    def __unicode__(self):
        # ret=str(self.nombre)
        return self.nombre

    class Meta:
        ordering = ['id']
        verbose_name = 'Tipo de Pago'
        verbose_name_plural = '4. Tipos de Pago'

class Tipostarjeta(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del Tipo de Tarjeta')
    def __unicode__(self):
        # ret=str(self.nombre)
        return self.nombre

    class Meta:
        ordering = ['id']
        verbose_name = 'Tipo de Tarjeta'
        verbose_name_plural = '5. Tipos de tarjeta'