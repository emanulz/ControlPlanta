# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
from proveedores.models import Proveedor


class Canal(models.Model):

    date=models.DateField(verbose_name='Fecha')
    consecutive=models.PositiveIntegerField(verbose_name='Consecutivo Matadero')
    weight=models.FloatField(verbose_name='Peso del canal Kg')
    qualification=models.CharField(max_length=255,choices=((u'AA', u'AA'), (u'A', u'A'), (u'B', u'B'), (u'C', u'C') , (u'D', u'D') , (u'E', u'E')),verbose_name='Clasificación')
    fierro=models.ForeignKey(Proveedor, verbose_name='# de Fierro')

    def fierronum(self):
        return self.fierro.fierro

    fierronum.short_description = "Fierro #"
    fierronum.admin_order_field = 'fierro'

    def __unicode__(self):
        datestr=str(self.date)
        consecutivestr=str(self.consecutive)

        return datestr+consecutivestr

    class Meta:
        ordering=['id']
        verbose_name_plural='1. Canales'
