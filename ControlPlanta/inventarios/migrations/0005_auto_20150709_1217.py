# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_auto_20150626_1002'),
        ('inventarios', '0004_auto_20150618_1541'),
    ]

    operations = [
        migrations.CreateModel(
            name='EntradasInventario',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datos', models.CharField(max_length=255, verbose_name=b'Datos de la entrada')),
                ('peso', models.FloatField(verbose_name=b'Cantidad Kilogramos')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora')),
                ('producto', models.ForeignKey(verbose_name=b'Corte', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Entradas en Inventario',
                'verbose_name_plural': '3. Entradas en Inventario',
            },
        ),
        migrations.CreateModel(
            name='ResumenInventario',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.FloatField(verbose_name=b'Cantidad en Inventario Kg')),
                ('producto', models.ForeignKey(verbose_name=b'Corte', to='productos.Producto', unique=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Resumen de Inventario',
                'verbose_name_plural': '2. Resumen de Inventario',
            },
        ),
        migrations.CreateModel(
            name='SalidasInventario',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datos', models.CharField(max_length=255, verbose_name=b'Datos de la salida')),
                ('peso', models.FloatField(verbose_name=b'Cantidad Kilogramos')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora')),
                ('producto', models.ForeignKey(verbose_name=b'Corte', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Entradas en Inventario',
                'verbose_name_plural': '5. Entradas en Inventario',
            },
        ),
        migrations.CreateModel(
            name='TiposEntradas',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del tipo de entrada')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipos entradas Inventario',
                'verbose_name_plural': '4. Tipos entradas Inventario',
            },
        ),
        migrations.CreateModel(
            name='TiposSalidas',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del tipo de salida')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipos salidas Inventario',
                'verbose_name_plural': '6. Tipos salidas Inventario',
            },
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='tipo',
            field=models.ForeignKey(verbose_name=b'Tipo de salida', to='inventarios.TiposSalidas'),
        ),
        migrations.AddField(
            model_name='entradasinventario',
            name='tipo',
            field=models.ForeignKey(verbose_name=b'Tipo de entrada', to='inventarios.TiposEntradas'),
        ),
    ]
