# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cotizaciones', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cotizacion',
            name='movil',
            field=models.IntegerField(default=0, verbose_name=b'A M\xc3\xb3vil #'),
        ),
        migrations.AddField(
            model_name='cotizacion',
            name='yadevuelto',
            field=models.BooleanField(default=False, verbose_name=b'Ya devuelto a inventario?'),
        ),
    ]
