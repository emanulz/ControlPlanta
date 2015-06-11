# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0004_lote_date'),
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deshuese',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pesototal', models.FloatField(default=0, verbose_name=b'Peso total')),
                ('mermakg', models.PositiveIntegerField(null=True, verbose_name=b'Merma en Kg', blank=True)),
                ('mermapor', models.PositiveIntegerField(null=True, verbose_name=b'Merma en %', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Deshuese',
                'verbose_name_plural': '1. Deshueses',
            },
        ),
        migrations.CreateModel(
            name='DetalleDeshuese',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('peso', models.FloatField(null=True, verbose_name=b'Peso en Kg', blank=True)),
                ('lote', models.ForeignKey(default=1, verbose_name=b'N\xc3\xbamero de Lote', to='lotes.Lote')),
                ('producto', models.ForeignKey(verbose_name=b'Corte', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Inventario Total',
                'verbose_name_plural': '1. Inventarios Totales',
            },
        ),
        migrations.AddField(
            model_name='deshuese',
            name='detalle',
            field=models.ManyToManyField(to='deshueses.DetalleDeshuese', verbose_name=b'Detalle'),
        ),
        migrations.AddField(
            model_name='deshuese',
            name='lote',
            field=models.ForeignKey(default=1, verbose_name=b'N\xc3\xbamero de Lote', to='lotes.Lote'),
        ),
        migrations.AddField(
            model_name='deshuese',
            name='productos',
            field=models.ManyToManyField(to='productos.Producto', verbose_name=b'Cortes'),
        ),
    ]
