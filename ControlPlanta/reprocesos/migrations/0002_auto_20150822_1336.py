# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reprocesos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reproceso',
            name='cortesusados',
            field=models.FloatField(default=1, verbose_name=b'Cantidad de cortes Usados'),
        ),
        migrations.AddField(
            model_name='reproceso',
            name='cortesusadoskg',
            field=models.FloatField(default=1, verbose_name=b'Cantidad de cortes Usados Kg'),
        ),
        migrations.AddField(
            model_name='reproceso',
            name='prodcreados',
            field=models.FloatField(default=1, verbose_name=b'Cantidad de productos creados'),
        ),
        migrations.AddField(
            model_name='reproceso',
            name='prodcreadoskg',
            field=models.FloatField(default=1, verbose_name=b'Cantidad de productos creados Kg'),
        ),
    ]
