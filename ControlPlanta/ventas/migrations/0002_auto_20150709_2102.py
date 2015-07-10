# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='time',
            field=models.TimeField(default=datetime.datetime(2015, 7, 10, 3, 2, 1, 421673, tzinfo=utc), verbose_name=b'Hora de la venta'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='venta',
            name='detalleproductos',
            field=models.ManyToManyField(to='ventas.DetalleProductos', verbose_name=b'Detalle de la Venta'),
        ),
    ]
