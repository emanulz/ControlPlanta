# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0001_initial'),
        ('clientes', '0001_initial'),
        ('productos', '0002_auto_20150626_1002'),
    ]

    operations = [
        migrations.CreateModel(
            name='DetalleProductos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('preciouni', models.FloatField(verbose_name=b'Precio Unitario')),
                ('cantidad', models.FloatField(verbose_name=b'Cantidad')),
                ('iv', models.BooleanField(verbose_name=b'Usa Impuestos?')),
                ('total', models.FloatField(verbose_name=b'Precio Total')),
                ('producto', models.ForeignKey(verbose_name=b'Producto', to='productos.Producto')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Detalle de Venta',
                'verbose_name_plural': '2. Detalles de Venta',
            },
        ),
        migrations.CreateModel(
            name='DetallesPago',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('montoefectivo', models.FloatField(verbose_name=b'Total de efectivo')),
                ('vuelto', models.FloatField(verbose_name=b'Vuelto')),
                ('digitos', models.IntegerField(verbose_name=b'\xc3\x9altimos 4 d\xc3\xadgitos tarjeta')),
                ('autorizacion', models.IntegerField(verbose_name=b'Autorizaci\xc3\xb3n Datafono')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Detalle de Pago',
                'verbose_name_plural': '3. Detalles de Pagos',
            },
        ),
        migrations.CreateModel(
            name='TiposPago',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del Tipo de Pago')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de Pago',
                'verbose_name_plural': '4. Tipos de Pago',
            },
        ),
        migrations.CreateModel(
            name='Tipostarjeta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre del Tipo de Pago')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de Tarjeta',
                'verbose_name_plural': '5. Tipos de tarjeta',
            },
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ticketnum', models.PositiveIntegerField(unique=True, verbose_name=b'Factura #')),
                ('nombrecliente', models.CharField(max_length=255, verbose_name=b'Nombre en Factura')),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('totolkilogramos', models.FloatField(verbose_name=b'Total')),
                ('cantidadarticulos', models.IntegerField(verbose_name=b'Cantidad de Art\xc3\xadculos')),
                ('subtotal', models.FloatField(verbose_name=b'Sub Total')),
                ('iv', models.FloatField(verbose_name=b'I.V')),
                ('descopor', models.FloatField(verbose_name=b'Descuento %')),
                ('desctocol', models.FloatField(verbose_name=b'Descuento')),
                ('total', models.FloatField(verbose_name=b'Total')),
                ('cashier', models.ForeignKey(verbose_name=b'Cajeros', to='cajeros.Cajero')),
                ('client', models.ForeignKey(verbose_name=b'Cliente', to='clientes.Cliente')),
                ('datosdelpago', models.ForeignKey(verbose_name=b'Detalle de Pago', to='ventas.DetallesPago')),
                ('detalleproductos', models.ManyToManyField(to='ventas.DetalleProductos', verbose_name=b'Detalle de Productos')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Venta',
                'verbose_name_plural': '1. Ventas',
            },
        ),
        migrations.AddField(
            model_name='detallespago',
            name='tarjeta',
            field=models.ForeignKey(verbose_name=b'Tipo de Tarjeta', to='ventas.Tipostarjeta'),
        ),
        migrations.AddField(
            model_name='detallespago',
            name='tipopago',
            field=models.ForeignKey(verbose_name=b'Tipo de Pago', to='ventas.TiposPago'),
        ),
    ]
