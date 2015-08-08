# -*- coding: utf-8 -*-

from django.db import models
from clientes.models import Cliente
from ventas.models import Venta

# Create your models here.
class Abonos(models.Model):
    cliente=models.ForeignKey(Cliente,verbose_name='Cliente')
    date=models.DateField(verbose_name='Fecha')
    time=models.TimeField(verbose_name='Hora de la venta')
    detalle=models.CharField(max_length=255,verbose_name='Detalle de Abono',default='Abono a Facturas')
    facturas=models.ManyToManyField(Venta,verbose_name='Facturas en el Abono',blank=True)
    monto=models.FloatField(default=0,verbose_name='Monto del abono ₡')
    saldoant=models.FloatField(default=0,verbose_name='Saldo Anterior ₡')
    saldoreal=models.FloatField(default=0,verbose_name='Saldo Actual ₡')
    def __unicode__(self):
        ret = str(self.id)
        return ret
    class Meta:
        ordering=['id']
        verbose_name='Abono'
        verbose_name_plural='1. Abonos'