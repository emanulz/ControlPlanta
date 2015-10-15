# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.


class Producto(models.Model):
    product_code = models.CharField(max_length=255, verbose_name='Código', unique=True)
    bar_code= models.PositiveIntegerField(verbose_name='Código de barras', blank=True, null=True ,unique=True)
    description = models.CharField(max_length=255, verbose_name='Descripción')
    category = models.ForeignKey('FamiliaDelProducto', default=1,verbose_name='Familia')
    inventory= models.FloatField(default=0,verbose_name='Existencia en Inventario')
    inventoryplanta= models.FloatField(default=0,verbose_name='Existencia en Planta')
    inventorypv=models.FloatField(default=0,verbose_name='Existencia en Punto de Venta')
    inventory1=models.FloatField(default=0,verbose_name='Existencia en Movil 1')
    inventory2=models.FloatField(default=0,verbose_name='Existencia en Movil 2')
    inventory3=models.FloatField(default=0,verbose_name='Existencia en Movil 3')
    minimum=models.FloatField(default=0,verbose_name='Mínimo en Inventario',blank=True)
    cost= models.FloatField(default=0, verbose_name='Costo Standard ₡')
    autoprice = models.BooleanField(default=0, verbose_name='Precio Auto?')
    utility1=models.FloatField(default=0, verbose_name='Utilidad Cliente %:')
    utility2=models.FloatField(default=0, verbose_name='Utilidad Distribuidor %:')
    utility3=models.FloatField(default=0, verbose_name='Utilidad Gobierno %:')
    price1 = models.FloatField(default=0, verbose_name='Precio Cliente ₡')
    price2 = models.FloatField(default=0, verbose_name='Precio Distribuidor ₡')
    price3 = models.FloatField(default=0, verbose_name='Precio Gobierno ₡')
    ventaneg = models.BooleanField(default=0, blank=True, verbose_name='Venta en Negativo?')
    fractioned = models.BooleanField(default=0, blank=True, verbose_name='Fracionado?')
    taxes = models.BooleanField(default=0, verbose_name='Impuestos?')
    taxes_amount = models.FloatField(default=0, blank=True, verbose_name='% Impuestos')


    def __unicode__(self):
        return self.description
    class Meta:
        ordering=['id']
        verbose_name='Producto'
        verbose_name_plural='1. Productos'

class FamiliaDelProducto(models.Model):
    name = models.CharField(max_length=255, verbose_name='nombre de la familia',unique=True)

    def __unicode__(self):
        return self.name
    class Meta:
        verbose_name='Familia'
        verbose_name_plural='2. Familias'
        ordering=['id']
