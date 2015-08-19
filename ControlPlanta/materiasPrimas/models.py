# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class MateriaPrima(models.Model):
    product_code = models.CharField(max_length=255, verbose_name='Código', unique=True)
    bar_code= models.PositiveIntegerField(verbose_name='Código de barras', blank=True, null=True ,unique=True)
    description = models.CharField(max_length=255, verbose_name='Descripción')
    category = models.ForeignKey('FamiliaDeLaMateria', default=1,verbose_name='Familia')
    inventory= models.FloatField(default=0,verbose_name='Existencia en Inventario')
    minimum=models.FloatField(default=0,verbose_name='Mínimo en Inventario',blank=True)
    cost= models.FloatField(default=0, verbose_name='Costo Kg ₡')

    def __unicode__(self):
        return self.description
    class Meta:
        ordering=['id']
        verbose_name='Materia Prima'
        verbose_name_plural='1. Materias Primas'

class FamiliaDeLaMateria(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre de la familia',unique=True)

    def __unicode__(self):
        return self.name
    class Meta:
        verbose_name='Familia MP'
        verbose_name_plural='2. Familias MP'
        ordering=['id']