# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0007_auto_20150827_1502'),
    ]

    operations = [
        migrations.CreateModel(
            name='DetalleDev',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('producto', models.PositiveIntegerField(default=1, verbose_name=b'Producto')),
                ('peso', models.PositiveIntegerField(default=0, verbose_name=b'Peso')),
                ('colones', models.PositiveIntegerField(default=0, verbose_name=b'Colones')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Detalle de devolucion',
                'verbose_name_plural': '2. Detalles de devolucion',
            },
        ),
        migrations.CreateModel(
            name='Devolucion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('detalledevolucion', models.ManyToManyField(to='devoluciones.DetalleDev', verbose_name=b'Detalles de la Devoluci\xc3\xb3n')),
                ('venta', models.ForeignKey(verbose_name=b'Num de venta', to='ventas.Venta')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Devolucion',
                'verbose_name_plural': '1. Devoluciones',
            },
        ),
    ]
