# -*- coding: utf-8 -*-

from django.db import models


class Gasto(models.Model):

    amount=models.FloatField(default=0,verbose_name='Monto del gasto')
    date=models.DateField(blank=True,verbose_name='Fecha del Gasto')
    tipo=models.ForeignKey('TipoGasto',default=1,verbose_name='Tipo de Gasto')
    factura=models.PositiveIntegerField(verbose_name='Número de factura',null=True,unique=False,blank=True)
    description=models.CharField(max_length=255,verbose_name='Descripción del gasto ₡',blank=True)

    def __unicode__(self):
        return str(self.id) + " - " + str(self.date)
    class Meta:
        ordering=['id']
        verbose_name='Gasto'
        verbose_name_plural='1. Gastos'


class TipoGasto(models.Model):

    name=models.CharField(max_length=255,verbose_name='Nombre del Tipo')
    def __unicode__(self):
        return self.name
    class Meta:
        ordering=['id']
        verbose_name='Tipo de Gasto'
        verbose_name_plural='2. Tipos de Gastos'