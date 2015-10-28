# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0012_auto_20151014_1759'),
    ]

    operations = [
        migrations.AddField(
            model_name='entradasinventario',
            name='pesoanterior',
            field=models.FloatField(default=0, verbose_name=b'Cantidad Kilogramos anterior'),
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='pesoanterior',
            field=models.FloatField(default=0, verbose_name=b'Cantidad Kilogramos anterior'),
        ),
    ]
