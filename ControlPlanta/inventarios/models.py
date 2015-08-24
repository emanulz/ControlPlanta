# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
from cajeros.models import Cajero
from lotes.models import Lote
from productos.models import Producto, FamiliaDelProducto


class InventarioTotal(models.Model):

    producto=models.ForeignKey(Producto,verbose_name='Corte',blank=False)
    peso= models.FloatField(verbose_name='Peso en Kg', blank=True, null=True ,)
    lote = models.ForeignKey(Lote, default=1,verbose_name='Número de Lote')
    vencimiento=models.DateField(default='2015-06-11',verbose_name='Fecha de vencimiento')
    tipo=models.ForeignKey(FamiliaDelProducto, default=1,verbose_name='Tipo de Carne')

    def __unicode__(self):
        return self.producto.description
    class Meta:
        ordering=['id']
        verbose_name='Inventario Total'
        verbose_name_plural='1. Inventarios Totales'


class ResumenInventario(models.Model):
    producto=models.OneToOneField(Producto,verbose_name='Corte')
    cantidad=models.FloatField(verbose_name='Cantidad en Inventario Kg')
    def __unicode__(self):
        return self.producto.description
    class Meta:
        ordering=['id']
        verbose_name='Resumen de Inventario'
        verbose_name_plural='2. Resumen de Inventario'

class EntradasInventario(models.Model):
    tipo=models.ForeignKey('TiposEntradas',verbose_name='Tipo de entrada')
    datos=models.CharField(max_length=255,verbose_name='Datos de la entrada')
    producto=models.ForeignKey(Producto,verbose_name='Corte')
    peso=models.FloatField(verbose_name='Cantidad Kilogramos')
    nuevopeso=models.FloatField(verbose_name='Cantidad Kilogramos nueva')
    date=models.DateField(verbose_name='Fecha' )
    time=models.TimeField(verbose_name='Hora' )
    usuario=models.ForeignKey(Cajero,verbose_name='usuario')
    def __unicode__(self):
        ret = str(self.id)
        return self.tipo.nombre+' #'+ret
    class Meta:
        ordering=['id']
        verbose_name='Entrada en Inventario'
        verbose_name_plural='3. Entradas en Inventario'

class TiposEntradas(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del tipo de entrada')
    def __unicode__(self):
        return self.nombre
    class Meta:
        ordering=['id']
        verbose_name='Tipo de entrada Inventario'
        verbose_name_plural='4. Tipos de entradas Inventario'

class SalidasInventario(models.Model):
    tipo=models.ForeignKey('TiposSalidas',verbose_name='Tipo de salida')
    datos=models.CharField(max_length=255,verbose_name='Datos de la salida')
    producto=models.ForeignKey(Producto,verbose_name='Corte')
    peso=models.FloatField(verbose_name='Cantidad Kilogramos')
    nuevopeso=models.FloatField(verbose_name='Cantidad Kilogramos nueva')
    date=models.DateField(verbose_name='Fecha' )
    time=models.TimeField(verbose_name='Hora' )
    usuario=models.ForeignKey(Cajero,verbose_name='Usuario')

    def __unicode__(self):
        ret = str(self.id)
        return self.tipo.nombre+' #'+ret
    class Meta:
        ordering=['id']
        verbose_name='Salida en Inventario'
        verbose_name_plural='5. Salidas en Inventario'

class TiposSalidas(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del tipo de salida')
    def __unicode__(self):
        return self.nombre
    class Meta:
        ordering=['id']
        verbose_name='Tipo de salida Inventario'
        verbose_name_plural='6. Tipos de salidas Inventario'
