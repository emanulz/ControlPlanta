# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='total',
            field=models.FloatField(default=0, verbose_name=b'Total Pendiente Cr\xc3\xa9dito'),
        ),
    ]
