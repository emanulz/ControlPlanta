# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0002_auto_20150807_2009'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='saldo',
            field=models.FloatField(default=0, verbose_name=b'Saldo Cr\xc3\xa9dito'),
        ),
    ]
