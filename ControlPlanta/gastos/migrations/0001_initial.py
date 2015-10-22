# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gasto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.FloatField(default=0, verbose_name=b'Monto del gasto')),
                ('date', models.DateField(verbose_name=b'Fecha del Gasto', blank=True)),
                ('factura', models.PositiveIntegerField(verbose_name=b'N\xc3\xbamero de factura', blank=True)),
                ('description', models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n del gasto', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Gasto',
                'verbose_name_plural': '1. Gastos',
            },
        ),
        migrations.CreateModel(
            name='TipoGasto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre del Tipo')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de Gasto',
                'verbose_name_plural': '2. Tipos de Gastos',
            },
        ),
        migrations.AddField(
            model_name='gasto',
            name='tipo',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Gasto', to='gastos.TipoGasto'),
        ),
    ]
