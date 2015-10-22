# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0002_auto_20151021_1833'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='factura',
            field=models.PositiveIntegerField(null=True, verbose_name=b'N\xc3\xbamero de factura', blank=True),
        ),
    ]
