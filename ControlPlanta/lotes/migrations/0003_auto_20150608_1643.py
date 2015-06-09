# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0002_auto_20150601_1845'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lote',
            name='totalweight',
            field=models.FloatField(default=0, verbose_name=b'Peso total del lote Kg'),
        ),
    ]
