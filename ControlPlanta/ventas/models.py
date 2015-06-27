# -*- coding: utf-8 -*-
from django.db import models


# Create your models here.
from cajeros.models import Cajero
from clientes.models import Cliente
from productos.models import Producto


class Venta(models.Model):


    ticketnum  = models.PositiveIntegerField(unique=True, verbose_name='Factura #')
    client = models.ForeignKey(Cliente, verbose_name='Cliente')
    cashier = models.ForeignKey(Cajero, verbose_name='Cajeros')
    productos = models.ManyToManyField(Producto, verbose_name='Productos')



    def __unicode__(self):

        return self.ticketnum

    class Meta:
        ordering = ['id']
        verbose_name = 'Venta'
        verbose_name_plural = '1. Ventas'