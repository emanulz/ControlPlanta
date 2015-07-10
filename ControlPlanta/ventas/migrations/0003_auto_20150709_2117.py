# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0002_auto_20150709_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='detalleproductos',
            field=models.ManyToManyField(to='ventas.DetalleProductos', verbose_name=b'Detalle de los Productos'),
        ),
    ]
