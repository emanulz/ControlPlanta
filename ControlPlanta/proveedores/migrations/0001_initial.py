# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Proveedor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre')),
                ('lastname', models.CharField(max_length=255, verbose_name=b'Apellido')),
                ('identification', models.PositiveIntegerField(unique=True, verbose_name=b'N\xc3\xbamero de c\xc3\xa9dula', blank=True)),
                ('provcode', models.PositiveIntegerField(unique=True, verbose_name=b'C\xc3\xb3digo de proveedor')),
                ('fierro', models.CharField(unique=True, max_length=255, verbose_name=b'# Fierro')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Proveedores',
            },
        ),
    ]
