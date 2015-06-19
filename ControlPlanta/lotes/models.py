# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
from canales.models import Canal
from productos.models import FamiliaDelProducto


class Lote(models.Model):

    lotenum=models.CharField(max_length=255,verbose_name='# de Lote', unique=True)
    tipo=models.ForeignKey(FamiliaDelProducto,verbose_name='Tipo de Carne')
    fierro=models.CharField(max_length=255,verbose_name='# de Fierro')
    canalesqty=models.PositiveIntegerField(verbose_name='Cantidad de canales')
    canales=models.ManyToManyField(Canal,verbose_name='Canales',blank=False)
    totalweight=models.FloatField(default=0, verbose_name='Peso total del lote Kg')
    date=models.DateField(default='2015-06-11',verbose_name='Fecha')
    isondeshuese=models.BooleanField(default=0,verbose_name='Se ha deshuesado?')

    def __unicode__(self):
        ret =str(self.lotenum)
        return unicode(ret) or u''
    class Meta:
        ordering=['id']
        verbose_name_plural='1. Lotes'

