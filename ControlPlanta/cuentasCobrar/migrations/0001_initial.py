# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0005_auto_20150814_1633'),
        ('clientes', '0003_remove_cliente_total'),
    ]

    operations = [
        migrations.CreateModel(
            name='Abono',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora de la venta')),
                ('detalle', models.CharField(default=b'Abono a Facturas', max_length=255, verbose_name=b'Detalle de Abono')),
                ('moneda', models.CharField(default=b'Colones', max_length=255, verbose_name=b'Moneda')),
                ('montocol', models.FloatField(default=0, verbose_name=b'Monto del abono \xe2\x82\xa1')),
                ('montodolar', models.FloatField(default=0, verbose_name=b'Monto del abono $')),
                ('digitos', models.IntegerField(default=0, verbose_name=b'\xc3\x9altimos 4 digitos tarjeta', blank=True)),
                ('autorizacion', models.IntegerField(default=0, verbose_name=b'N\xc3\xbamero de autorizaci\xc3\xb3n tarjeta', blank=True)),
                ('transfnum', models.IntegerField(default=0, verbose_name=b'N\xc3\xbamero de transferencia', blank=True)),
                ('chequenum', models.IntegerField(default=0, verbose_name=b'N\xc3\xbamero de cheque', blank=True)),
                ('banco', models.CharField(max_length=255, verbose_name=b'Banco', blank=True)),
                ('saldoant', models.FloatField(default=0, verbose_name=b'Saldo Anterior \xe2\x82\xa1')),
                ('saldoreal', models.FloatField(default=0, verbose_name=b'Saldo Actual \xe2\x82\xa1')),
                ('facturas', models.ManyToManyField(to='ventas.Venta', verbose_name=b'Facturas en el Abono', blank=True)),
                ('tipopago', models.ForeignKey(default=1, verbose_name=b'Tipo de Pago', to='ventas.TiposPago')),
                ('tipotarjeta', models.ForeignKey(default=6, verbose_name=b'Tipo de Tarjeta', to='ventas.Tipostarjeta')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Abono',
                'verbose_name_plural': '2. Abonos',
            },
        ),
        migrations.CreateModel(
            name='DetalleCuenta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('total', models.FloatField(default=0, verbose_name=b'Total Pendiente Cr\xc3\xa9dito')),
                ('abonos', models.ManyToManyField(to='cuentasCobrar.Abono', verbose_name=b'Detalle de abonos', blank=True)),
                ('cliente', models.OneToOneField(verbose_name=b'Cliente', to='clientes.Cliente')),
                ('pending', models.ManyToManyField(to='ventas.Venta', verbose_name=b'Facturas pendientes', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Cuenta por cobrar',
                'verbose_name_plural': '1. Cuentas por Cobrar',
            },
        ),
    ]
