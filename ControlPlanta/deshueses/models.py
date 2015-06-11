# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
from inventarios.models import InventarioTotal
from lotes.models import Lote
from productos.models import Producto


class Deshuese(models.Model):

    lote = models.ForeignKey(Lote, default=1,verbose_name='Número de Lote')
    pesototal=models.FloatField(default=0,verbose_name='Peso total')
    mermakg= models.PositiveIntegerField(verbose_name='Merma en Kg', blank=True, null=True ,)
    mermapor= models.PositiveIntegerField(verbose_name='Merma en %', blank=True, null=True ,)
    productos=models.ManyToManyField(Producto,verbose_name='Cortes',blank=False)
    detalle=models.ManyToManyField('DetalleDeshuese',verbose_name='Detalle',blank=False)
    

    def __unicode__(self):
        return self.lote.lotenum
    class Meta:
        ordering=['id']
        verbose_name='Deshuese'
        verbose_name_plural='1. Deshueses'

    def pesototallote(self):
         pesototaldellote=self.lote.totalweight
         return pesototaldellote

class DetalleDeshuese(models.Model):

    producto=models.ForeignKey(Producto,verbose_name='Corte',blank=False)
    peso= models.FloatField(verbose_name='Peso en Kg', blank=True, null=True ,)
    lote = models.ForeignKey(Lote, default=1,verbose_name='Número de Lote')

    def __unicode__(self):
        return self.id
    class Meta:
        ordering=['id']
        verbose_name='Detalle deshuese'
        verbose_name_plural='2. Detalles de deshuese'