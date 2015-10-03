# -*- coding: utf-8 -*-
from django.db import models


# Create your models here.
from cajeros.models import Cajero
from clientes.models import Cliente

from productos.models import Producto

class Cotizacion(models.Model):

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
    detalleproductos = models.ManyToManyField('DetalleProductosCoti', verbose_name='Detalle de los Productos')

    def __unicode__(self):
        ret=str(self.id)
        return ret

    class Meta:
        ordering = ['id']
        verbose_name = 'Cotizacion'
        verbose_name_plural = '1. Cotizaciones'

class DetalleProductosCoti(models.Model):
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
        verbose_name = 'Detalle de Cotizacion'
        verbose_name_plural = '2. Detalles de Cotizaciones'