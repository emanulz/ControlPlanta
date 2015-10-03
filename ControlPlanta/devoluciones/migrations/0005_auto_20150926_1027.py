# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('devoluciones', '0004_auto_20150921_2027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalledev',
            name='colones',
            field=models.FloatField(default=0, verbose_name=b'Colones'),
        ),
        migrations.AlterField(
            model_name='detalledev',
            name='peso',
            field=models.FloatField(default=0, verbose_name=b'Peso'),
        ),
    ]
