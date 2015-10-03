# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0004_cliente_discount'),
        ('productos', '0005_producto_minimum'),
        ('cajeros', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cotizacion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombrecliente', models.CharField(max_length=255, verbose_name=b'Nombre en Factura')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora de la venta')),
                ('totolkilogramos', models.FloatField(verbose_name=b'Total Kg')),
                ('cantidadarticulos', models.IntegerField(verbose_name=b'Cantidad de Art\xc3\xadculos')),
                ('subtotal', models.FloatField(verbose_name=b'Sub Total')),
                ('iv', models.FloatField(verbose_name=b'I.V')),
                ('descopor', models.FloatField(verbose_name=b'Descuento %')),
                ('desctocol', models.FloatField(verbose_name=b'Descuento \xe2\x82\xa1')),
                ('total', models.FloatField(verbose_name=b'Total \xe2\x82\xa1')),
                ('cashier', models.ForeignKey(verbose_name=b'Cajeros', to='cajeros.Cajero')),
                ('client', models.ForeignKey(verbose_name=b'Cliente', to='clientes.Cliente')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Cotizacion',
                'verbose_name_plural': '1. Cotizaciones',
            },
        ),
        migrations.CreateModel(
            name='DetalleProductosCoti',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n', blank=True)),
                ('preciouni', models.FloatField(verbose_name=b'Precio Unitario \xe2\x82\xa1')),
                ('cantidad', models.FloatField(verbose_name=b'Cantidad')),
                ('iv', models.BooleanField(verbose_name=b'Usa Impuestos?')),
                ('total', models.FloatField(verbose_name=b'Precio Total \xe2\x82\xa1')),
                ('producto', models.ForeignKey(verbose_name=b'Producto', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Detalle de Cotizacion',
                'verbose_name_plural': '2. Detalles de Cotizaciones',
            },
        ),
        migrations.AddField(
            model_name='cotizacion',
            name='detalleproductos',
            field=models.ManyToManyField(to='cotizaciones.DetalleProductosCoti', verbose_name=b'Detalle de los Productos'),
        ),
    ]
