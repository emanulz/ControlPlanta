# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0006_auto_20150818_2102'),
        ('cuentasCobrar', '0003_auto_20150817_2158'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotaDeCredito',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('time', models.TimeField(verbose_name=b'Hora de la venta')),
                ('monto', models.FloatField(default=0, verbose_name=b'Monto de la nota')),
                ('saldoanterior', models.FloatField(default=0, verbose_name=b'Saldo de la cuenta antes de aplicar')),
                ('saldoactual', models.FloatField(default=0, verbose_name=b'Saldo de la cuenta despu\xc3\xa9s de aplicar')),
                ('notasdecredito', models.ManyToManyField(to='ventas.Venta', verbose_name=b'Ventas asociadas', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Nota de cr\xe9dito',
                'verbose_name_plural': '3. Notas de cr\xe9dito',
            },
        ),
        migrations.AddField(
            model_name='detallecuenta',
            name='notasdecredito',
            field=models.ManyToManyField(to='cuentasCobrar.NotaDeCredito', verbose_name=b'Notas de cr\xc3\xa9dito asociadas', blank=True),
        ),
    ]
