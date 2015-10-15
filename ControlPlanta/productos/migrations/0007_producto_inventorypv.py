# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_auto_20151006_1813'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='inventorypv',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Punto de Venta'),
        ),
    ]
