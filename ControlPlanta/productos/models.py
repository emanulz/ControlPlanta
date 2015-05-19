# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.


class Producto(models.Model):
    product_code = models.CharField(max_length=255, verbose_name='Código', unique=True)
    bar_code= models.PositiveIntegerField(verbose_name='Código de barras', blank=True, null=True ,unique=True)
    description = models.CharField(max_length=255, verbose_name='Descripción')
    price = models.FloatField(default=0, verbose_name='Precio ₡')
    fractioned = models.BooleanField(default=0, blank=True, verbose_name='Fracionado?')
    taxes = models.BooleanField(default=0, verbose_name='Impuestos?')
    taxes_amount = models.FloatField(default=0, blank=True, verbose_name='% Impuestos')
    category = models.ForeignKey('FamiliaDelProducto', default=1,verbose_name='Familia')

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
