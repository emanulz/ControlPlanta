# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='factura',
            field=models.PositiveIntegerField(null=True, verbose_name=b'N\xc3\xbamero de factura'),
        ),
    ]
