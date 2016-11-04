# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class Cajero(models.Model):

    name = models.CharField(max_length=255, verbose_name='Nombre')
    last_name = models.CharField(max_length=255, verbose_name='Apellidos')
    identification = models.CharField(max_length=255, verbose_name='Cédula', unique=True)
    user = models.ForeignKey(User, verbose_name='Nombre de Usuario')

    def __unicode__(self):
        return self.name + " " + self.last_name

    class Meta:
        ordering = ['id']
        verbose_name_plural = '1. Cajeros'


class Vendedor(models.Model):

    name = models.CharField(max_length=255, verbose_name='Nombre')
    last_name = models.CharField(max_length=255, verbose_name='Apellidos')
    identification = models.CharField(max_length=255, verbose_name='Cédula', unique=True)

    def __unicode__(self):
        return self.name + " " + self.last_name

    class Meta:
        ordering = ['id']
        verbose_name_plural = '2. Vendedores'
