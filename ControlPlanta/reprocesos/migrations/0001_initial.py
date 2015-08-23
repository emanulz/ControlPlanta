# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0010_auto_20150725_1015'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reproceso',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('entrada', models.ForeignKey(verbose_name=b'Entrada de inventario relacionada', to='inventarios.EntradasInventario')),
                ('salida', models.ForeignKey(verbose_name=b'Entrada de inventario relacionada', to='inventarios.SalidasInventario')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Reproceso',
                'verbose_name_plural': '1. Reprocesos',
            },
        ),
    ]
