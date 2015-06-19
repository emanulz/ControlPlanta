# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
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