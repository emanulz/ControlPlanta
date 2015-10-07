# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0005_producto_minimum'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='inventory1',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Movil 1'),
        ),
        migrations.AddField(
            model_name='producto',
            name='inventory2',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Movil 2'),
        ),
        migrations.AddField(
            model_name='producto',
            name='inventory3',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Movil 3'),
        ),
        migrations.AddField(
            model_name='producto',
            name='inventoryplanta',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Planta'),
        ),
    ]
