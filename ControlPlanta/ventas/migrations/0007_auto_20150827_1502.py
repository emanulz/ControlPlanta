# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0006_auto_20150818_2102'),
    ]

    operations = [
        migrations.AddField(
            model_name='detallespago',
            name='saldoactual',
            field=models.FloatField(default=0, verbose_name=b'Saldo Cr\xc3\xa9dito nuevo \xe2\x82\xa1', blank=True),
        ),
        migrations.AddField(
            model_name='detallespago',
            name='saldoant',
            field=models.FloatField(default=0, verbose_name=b'Saldo Cr\xc3\xa9dito anterior \xe2\x82\xa1', blank=True),
        ),
    ]
