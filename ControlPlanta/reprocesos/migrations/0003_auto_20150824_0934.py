# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0010_auto_20150725_1015'),
        ('reprocesos', '0002_auto_20150822_1336'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reproceso',
            name='entrada',
        ),
        migrations.AddField(
            model_name='reproceso',
            name='entrada',
            field=models.ManyToManyField(to='inventarios.EntradasInventario', verbose_name=b'Entrada de inventario relacionada'),
        ),
        migrations.RemoveField(
            model_name='reproceso',
            name='salida',
        ),
        migrations.AddField(
            model_name='reproceso',
            name='salida',
            field=models.ManyToManyField(to='inventarios.SalidasInventario', verbose_name=b'Entrada de inventario relacionada'),
        ),
    ]
