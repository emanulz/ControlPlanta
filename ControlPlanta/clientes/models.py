# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.

def phone_default():
    return '0000-0000'


# Cliente = Client

class Cliente(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    last_name = models.CharField(max_length=255, verbose_name='Apellidos', null=True)
    phone_number = models.CharField(max_length=9, blank=True, null=True, default=phone_default,verbose_name='Número de teléfono')
    identification = models.CharField(max_length=255, blank=True, null=True, unique=True,verbose_name='Cédula')
    adress = models.CharField(max_length=255, blank=True, null=True, verbose_name='Dirección')
    credit = models.BooleanField(default=0, verbose_name='Tiene crédito?')
    credit_limit = models.FloatField(blank=True, default=0, verbose_name='Límite de crédito')
    email = models.EmailField(blank=True, null=True)
    associated=models.BooleanField(default=0, verbose_name='Es asociado?')
    associated_code=models.PositiveIntegerField( null=True, blank=True,unique=True,verbose_name='Número de asociado')
    def __unicode__(self):
        return self.name + " " + self.last_name
    class Meta:
        ordering=['id']
        verbose_name_plural='1. Clientes'