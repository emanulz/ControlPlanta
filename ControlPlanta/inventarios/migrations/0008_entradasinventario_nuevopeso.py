# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0007_auto_20150709_1220'),
    ]

    operations = [
        migrations.AddField(
            model_name='entradasinventario',
            name='nuevopeso',
            field=models.FloatField(default=0, verbose_name=b'Cantidad Kilogramos nueva'),
            preserve_default=False,
        ),
    ]
