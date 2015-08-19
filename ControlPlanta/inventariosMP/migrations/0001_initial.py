# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('materiasPrimas', '0002_auto_20150818_1611'),
        ('cajeros', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EntradasInventarioMP',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datos', models.CharField(max_length=255, verbose_name=b'Datos de la entrada')),
                ('peso', models.FloatField(verbose_name=b'Cantidad Kilogramos')),
                ('nuevopeso', models.FloatField(verbose_name=b'Cantidad Kilogramos nueva')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora')),
                ('materiaprima', models.ForeignKey(verbose_name=b'MateriaPrima', to='materiasPrimas.MateriaPrima')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Entrada en Inventario',
                'verbose_name_plural': '2. Entradas en Inventario',
            },
        ),
        migrations.CreateModel(
            name='ResumenInventarioMP',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('cantidad', models.FloatField(verbose_name=b'Cantidad en Inventario Kg')),
                ('materiaprima', models.OneToOneField(verbose_name=b'Materia Prima', to='materiasPrimas.MateriaPrima')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Resumen de Inventario MP',
                'verbose_name_plural': '1. Resumen de Inventario MP',
            },
        ),
        migrations.CreateModel(
            name='SalidasInventarioMP',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('datos', models.CharField(max_length=255, verbose_name=b'Datos de la salida')),
                ('peso', models.FloatField(verbose_name=b'Cantidad Kilogramos')),
                ('nuevopeso', models.FloatField(verbose_name=b'Cantidad Kilogramos nueva')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora')),
                ('materiaprima', models.ForeignKey(verbose_name=b'Corte', to='materiasPrimas.MateriaPrima')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Salida en Inventario',
                'verbose_name_plural': '4. Salidas en Inventario',
            },
        ),
        migrations.CreateModel(
            name='TiposEntradasMP',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del tipo de entrada')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de entrada Inventario',
                'verbose_name_plural': '3. Tipos de entradas Inventario',
            },
        ),
        migrations.CreateModel(
            name='TiposSalidasMP',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del tipo de salida')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de salida Inventario',
                'verbose_name_plural': '5. Tipos de salidas Inventario',
            },
        ),
        migrations.AddField(
            model_name='salidasinventariomp',
            name='tipo',
            field=models.ForeignKey(verbose_name=b'Tipo de salida', to='inventariosMP.TiposSalidasMP'),
        ),
        migrations.AddField(
            model_name='salidasinventariomp',
            name='usuario',
            field=models.ForeignKey(verbose_name=b'Usuario', to='cajeros.Cajero'),
        ),
        migrations.AddField(
            model_name='entradasinventariomp',
            name='tipo',
            field=models.ForeignKey(verbose_name=b'Tipo de entrada', to='inventariosMP.TiposEntradasMP'),
        ),
        migrations.AddField(
            model_name='entradasinventariomp',
            name='usuario',
            field=models.ForeignKey(verbose_name=b'usuario', to='cajeros.Cajero'),
        ),
    ]
