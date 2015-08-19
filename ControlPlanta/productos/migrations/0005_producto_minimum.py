# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0004_producto_inventory'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='minimum',
            field=models.FloatField(default=0, verbose_name=b'M\xc3\xadnimo en Inventario', blank=True),
        ),
    ]
