# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
from canales.models import Canal


class Lote(models.Model):

    lotenum=models.CharField(max_length=255,verbose_name='# de Lote', unique=True)
    fierro=models.CharField(max_length=255,verbose_name='# de Fierro')
    canalesqty=models.PositiveIntegerField(verbose_name='Cantidad de canales')
    canales=models.ManyToManyField(Canal,verbose_name='Canales')
    totalweight=models.FloatField(default=0, verbose_name='Peso total del lote Kg')
    date=models.DateField(default='1988-05-10',verbose_name='Fecha')

    def __unicode__(self):
        return self.lotenum
    class Meta:
        ordering=['id']
        verbose_name_plural='1. Lotes'

