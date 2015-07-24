# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_producto_ventaneg'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='inventory',
            field=models.FloatField(default=0, verbose_name=b'Existencia en Inventario'),
        ),
    ]
