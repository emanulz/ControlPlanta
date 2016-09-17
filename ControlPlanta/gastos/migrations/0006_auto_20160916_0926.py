# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0005_auto_20160916_0919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='amount',
            field=models.FloatField(verbose_name=b'Monto del gasto'),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='description',
            field=models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n del gasto', blank=True),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='factura',
            field=models.PositiveIntegerField(verbose_name=b'N\xc3\xbamero de factura'),
        ),
    ]
