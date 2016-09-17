# -*- coding: utf-8 -*-

from django.db import models
from proveedores.models import Proveedor


class Gasto(models.Model):

    amount = models.FloatField(verbose_name='Monto del gasto')
    date = models.DateField(blank=True, verbose_name='Fecha del Gasto')
    proveedor = models.ForeignKey(Proveedor, null=True, verbose_name='Proveedor')
    factura = models.CharField(max_length=255, verbose_name='Número de factura',)
    code = models.CharField(max_length=15, unique=True, null=True, verbose_name='Código del gasto')
    tipo = models.ForeignKey('TipoGasto', default=1, verbose_name='Tipo de Gasto')
    cantidad = models.DecimalField(max_digits=11, decimal_places=2, default=0, verbose_name='Cantidad')
    unidad = models.ForeignKey('UnidadesGasto', null=True, verbose_name='Unidad')
    description = models.CharField(max_length=255, verbose_name='Descripción del gasto')

    def __unicode__(self):
        return str(self.id) + " - " + str(self.date)

    class Meta:
        ordering = ['id']
        verbose_name = 'Gasto'
        verbose_name_plural = '1. Gastos'


class TipoGasto(models.Model):

    name = models.CharField(max_length=255,verbose_name='Nombre del Tipo')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Tipo de Gasto'
        verbose_name_plural = '2. Tipos de Gastos'


class UnidadesGasto(models.Model):

    name = models.CharField(max_length=255,verbose_name='Nombre de la unidad')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = 'Tipo de Gasto'
        verbose_name_plural = '3. Unidades'
