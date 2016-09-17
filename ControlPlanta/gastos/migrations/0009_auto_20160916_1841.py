# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0008_gasto_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='factura',
            field=models.CharField(max_length=255, verbose_name=b'N\xc3\xbamero de factura'),
        ),
    ]
