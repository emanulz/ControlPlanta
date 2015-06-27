# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0001_initial'),
        ('productos', '0002_auto_20150626_1002'),
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ticketnum', models.PositiveIntegerField(unique=True, verbose_name=b'Factura #')),
                ('cashier', models.ForeignKey(verbose_name=b'Cajeros', to='cajeros.Cajero')),
                ('client', models.ForeignKey(verbose_name=b'Cliente', to='clientes.Cliente')),
                ('productos', models.ManyToManyField(to='productos.Producto', verbose_name=b'Productos')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Venta',
                'verbose_name_plural': '1. Ventas',
            },
        ),
    ]
