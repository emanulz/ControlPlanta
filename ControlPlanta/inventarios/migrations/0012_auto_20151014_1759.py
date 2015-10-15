# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0011_auto_20150921_1705'),
    ]

    operations = [
        migrations.AddField(
            model_name='entradasinventario',
            name='ainventario',
            field=models.CharField(default=b'Planta', max_length=255, verbose_name=b'A que inventario fue:'),
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='ainventario',
            field=models.CharField(default=b'Planta', max_length=255, verbose_name=b'A que inventario fue:'),
        ),
    ]
