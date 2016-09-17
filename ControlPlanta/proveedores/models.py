# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.


class Proveedor(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    lastname = models.CharField(max_length=255, blank=True, null=True, verbose_name='Apellido')
    identification = models.CharField(max_length=255, null=True, verbose_name='Número de Identificación')
    provcode = models.PositiveIntegerField(null=True, blank=True, verbose_name='Código de Asociado(opcional)')
    fierro = models.CharField(max_length=255, unique=True, verbose_name='Código de proveedor')

    def __unicode__(self):
        return self.fierro+" "+self.name + " " + self.lastname

    class Meta:
        ordering = ['id']
        verbose_name_plural = '1. Proveedores'
