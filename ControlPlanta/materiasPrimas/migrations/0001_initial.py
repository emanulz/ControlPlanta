# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FamiliaDeLaMateria',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255, verbose_name=b'Nombre de la familia')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Familia MP',
                'verbose_name_plural': '2. Familias MP',
            },
        ),
        migrations.CreateModel(
            name='MateriaPrima',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('product_code', models.CharField(unique=True, max_length=255, verbose_name=b'C\xc3\xb3digo')),
                ('bar_code', models.PositiveIntegerField(unique=True, null=True, verbose_name=b'C\xc3\xb3digo de barras', blank=True)),
                ('description', models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n')),
                ('inventory', models.FloatField(default=0, verbose_name=b'Existencia en Inventario')),
                ('cost', models.FloatField(default=0, verbose_name=b'Costo \xe2\x82\xa1')),
                ('category', models.ForeignKey(default=1, verbose_name=b'Familia', to='materiasPrimas.FamiliaDeLaMateria')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Materia Prima',
                'verbose_name_plural': '1. Materias Primas',
            },
        ),
    ]
