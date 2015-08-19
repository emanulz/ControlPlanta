# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('materiasPrimas', '0002_auto_20150818_1611'),
    ]

    operations = [
        migrations.AddField(
            model_name='materiaprima',
            name='minimum',
            field=models.FloatField(default=0, verbose_name=b'M\xc3\xadnimo en Inventario', blank=True),
        ),
    ]
