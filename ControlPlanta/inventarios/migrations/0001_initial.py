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
            name='InventarioTotal',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('peso', models.FloatField(null=True, verbose_name=b'Peso en Kg', blank=True)),
                ('vencimiento', models.CharField(max_length=255, verbose_name=b'Fecha de vencimiento')),
                ('lote', models.ForeignKey(default=1, verbose_name=b'N\xc3\xbamero de Lote', to='lotes.Lote')),
                ('producto', models.ForeignKey(verbose_name=b'Corte', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Inventario Total',
                'verbose_name_plural': '1. Inventarios Totales',
            },
        ),
    ]
