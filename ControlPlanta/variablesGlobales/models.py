# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class VariableGlobal(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre')
    descripcion=models.CharField(max_length=255,verbose_name='Descripcion',blank=True)
    valornum=models.FloatField(default=0,verbose_name='Valor Numérico',blank=True)
    valortext=models.CharField(max_length=255,verbose_name='Valor texto',blank=True)

    def __unicode__(self):
        ret=str(self.id)
        return ret

    class Meta:
        ordering = ['id']
        verbose_name = 'Variable Global'
        verbose_name_plural = '1. Variables Globales'