# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0003_venta_saldo'),
        ('clientes', '0003_remove_cliente_total'),
    ]

    operations = [
        migrations.CreateModel(
            name='Abonos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora de la venta')),
                ('detalle', models.CharField(default=b'Abono a Facturas', max_length=255, verbose_name=b'Detalle de Abono')),
                ('monto', models.FloatField(default=0, verbose_name=b'Monto del abono \xe2\x82\xa1')),
                ('saldoant', models.FloatField(default=0, verbose_name=b'Saldo Anterior \xe2\x82\xa1')),
                ('saldoreal', models.FloatField(default=0, verbose_name=b'Saldo Actual \xe2\x82\xa1')),
                ('facturas', models.ManyToManyField(to='ventas.Venta', verbose_name=b'Facturas en el Abono', blank=True)),
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
                ('abonos', models.ManyToManyField(to='cuentasCobrar.Abonos', verbose_name=b'Detalle de abonos')),
                ('cliente', models.ForeignKey(verbose_name=b'Cliente', to='clientes.Cliente')),
                ('pending', models.ManyToManyField(to='ventas.Venta', verbose_name=b'Facturas pendientes', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Cuenta por cobrar',
                'verbose_name_plural': '1. Cuentas por Cobrar',
            },
        ),
    ]
