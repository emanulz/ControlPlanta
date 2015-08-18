# -*- coding: utf-8 -*-

from django.db import models
from clientes.models import Cliente
from ventas.models import Venta, TiposPago, Tipostarjeta

# Create your models here.
class DetalleCuenta(models.Model):
    cliente=models.OneToOneField(Cliente,verbose_name='Cliente')
    total=models.FloatField(default=0,verbose_name='Total Pendiente Crédito')
    pending=models.ManyToManyField(Venta,verbose_name='Facturas pendientes',blank=True)
    abonos=models.ManyToManyField('Abono',verbose_name='Detalle de abonos',blank=True)
    def __unicode__(self):
        ret = str(self.id)
        return ret
    class Meta:
        ordering=['id']
        verbose_name='Cuenta por cobrar'
        verbose_name_plural='1. Cuentas por Cobrar'

class Abono(models.Model):
    date=models.DateField(verbose_name='Fecha')
    time=models.TimeField(verbose_name='Hora de la venta')
    detalle=models.CharField(max_length=255,verbose_name='Detalle de Abono',default='Abono a Facturas')
    facturas=models.ManyToManyField(Venta,verbose_name='Facturas en el Abono',blank=True)
    moneda=models.CharField(max_length=255,verbose_name='Moneda',default='Colones')
    montocol=models.FloatField(default=0,verbose_name='Monto del abono ₡')
    montodolar=models.FloatField(default=0,verbose_name='Monto del abono $')
    tipopago=models.ForeignKey(TiposPago,verbose_name='Tipo de Pago',default=1)#tipo de pago=efect tarje cheque
    tipotarjeta=models.ForeignKey(Tipostarjeta,verbose_name='Tipo de Tarjeta',default=6)
    digitos=models.IntegerField(blank=True,verbose_name='Últimos 4 digitos tarjeta',default=0000)
    autorizacion=models.IntegerField(blank=True,verbose_name='Número de autorización tarjeta',default=0000)
    transfnum=models.IntegerField(blank=True,verbose_name='Número de transferencia',default=0000)
    bancotransf=models.CharField(max_length=255,verbose_name='Banco',blank=True)
    chequenum=models.IntegerField(blank=True,verbose_name='Número de cheque',default=0000)
    bancocheque=models.CharField(max_length=255,verbose_name='Banco',blank=True)
    saldoant=models.FloatField(default=0,verbose_name='Saldo Anterior ₡')
    saldoactual=models.FloatField(default=0,verbose_name='Saldo Actual ₡')
    def __unicode__(self):
        ret = str(self.id)
        return ret
    class Meta:
        ordering=['id']
        verbose_name='Abono'
        verbose_name_plural='2. Abonos'




