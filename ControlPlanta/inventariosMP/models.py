# -*- coding: utf-8 -*-
from django.db import models
from cajeros.models import Cajero

from materiasPrimas.models import MateriaPrima, FamiliaDeLaMateria
# Create your models here.
class ResumenInventarioMP(models.Model):
    materiaprima=models.OneToOneField(MateriaPrima,verbose_name='Materia Prima')
    cantidad=models.FloatField(verbose_name='Cantidad en Inventario Kg')
    def __unicode__(self):
        return self.materiaprima.description
    class Meta:
        ordering=['id']
        verbose_name='Resumen de Inventario MP'
        verbose_name_plural='1. Resumen de Inventario MP'

class EntradasInventarioMP(models.Model):
    tipo=models.ForeignKey('TiposEntradasMP',verbose_name='Tipo de entrada')
    datos=models.CharField(max_length=255,verbose_name='Datos de la entrada')
    materiaprima=models.ForeignKey(MateriaPrima,verbose_name='MateriaPrima')
    peso=models.FloatField(verbose_name='Cantidad Kilogramos')
    nuevopeso=models.FloatField(verbose_name='Cantidad Kilogramos nueva')
    date=models.DateField(verbose_name='Fecha' )
    time=models.TimeField(verbose_name='Hora' )
    usuario=models.ForeignKey(Cajero,verbose_name='usuario')
    def __unicode__(self):
        return self.tipo.nombre
    class Meta:
        ordering=['id']
        verbose_name='Entrada en Inventario'
        verbose_name_plural='2. Entradas en Inventario'

class TiposEntradasMP(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del tipo de entrada')
    def __unicode__(self):
        return self.nombre
    class Meta:
        ordering=['id']
        verbose_name='Tipo de entrada Inventario'
        verbose_name_plural='3. Tipos de entradas Inventario'

class SalidasInventarioMP(models.Model):
    tipo=models.ForeignKey('TiposSalidasMP',verbose_name='Tipo de salida')
    datos=models.CharField(max_length=255,verbose_name='Datos de la salida')
    materiaprima=models.ForeignKey(MateriaPrima,verbose_name='Corte')
    peso=models.FloatField(verbose_name='Cantidad Kilogramos')
    nuevopeso=models.FloatField(verbose_name='Cantidad Kilogramos nueva')
    date=models.DateField(verbose_name='Fecha' )
    time=models.TimeField(verbose_name='Hora' )
    usuario=models.ForeignKey(Cajero,verbose_name='Usuario')

    def __unicode__(self):
        return self.tipo.nombre
    class Meta:
        ordering=['id']
        verbose_name='Salida en Inventario'
        verbose_name_plural='4. Salidas en Inventario'

class TiposSalidasMP(models.Model):
    nombre=models.CharField(max_length=255,verbose_name='Nombre del tipo de salida')
    def __unicode__(self):
        return self.nombre
    class Meta:
        ordering=['id']
        verbose_name='Tipo de salida Inventario'
        verbose_name_plural='5. Tipos de salidas Inventario'