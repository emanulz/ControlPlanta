# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.
from cuentasCobrar.models import NotaDeCredito
from ventas.models import Venta


class Devolucion(models.Model):
    venta=models.ForeignKey(Venta,verbose_name='Num de venta')
    detalledevolucion=models.ManyToManyField('DetalleDev',verbose_name='Detalles de la Devolución',null=True)
    notacredito=models.ForeignKey(NotaDeCredito,verbose_name='Nota de crédito',null=True)


    def __unicode__(self):
        return str(self.id)
    class Meta:
        ordering=['id']
        verbose_name='Devolucion'
        verbose_name_plural='1. Devoluciones'


class DetalleDev(models.Model):
    producto=models.PositiveIntegerField(default=1 ,verbose_name='Producto')
    peso=models.FloatField(default=0 ,verbose_name='Peso')
    colones=models.FloatField(default=0 ,verbose_name='Colones')
    def __unicode__(self):
        return str(self.id)
    class Meta:
        ordering=['id']
        verbose_name='Detalle de devolucion'
        verbose_name_plural='2. Detalles de devolucion'