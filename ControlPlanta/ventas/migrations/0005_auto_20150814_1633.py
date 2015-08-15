# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0004_venta_anulada'),
    ]

    operations = [
        migrations.AddField(
            model_name='detalleproductos',
            name='description',
            field=models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n', blank=True),
        ),
        migrations.AlterField(
            model_name='detalleproductos',
            name='preciouni',
            field=models.FloatField(verbose_name=b'Precio Unitario \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='detalleproductos',
            name='total',
            field=models.FloatField(verbose_name=b'Precio Total \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='detallespago',
            name='montoefectivo',
            field=models.FloatField(null=True, verbose_name=b'Total de efectivo \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='detallespago',
            name='vuelto',
            field=models.FloatField(null=True, verbose_name=b'Vuelto \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='venta',
            name='desctocol',
            field=models.FloatField(verbose_name=b'Descuento \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='venta',
            name='saldo',
            field=models.FloatField(default=0, verbose_name=b'Saldo Cr\xc3\xa9dito \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='venta',
            name='total',
            field=models.FloatField(verbose_name=b'Total \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='venta',
            name='totolkilogramos',
            field=models.FloatField(verbose_name=b'Total Kg'),
        ),
    ]
