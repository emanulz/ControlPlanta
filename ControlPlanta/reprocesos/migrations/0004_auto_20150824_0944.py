# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reprocesos', '0003_auto_20150824_0934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reproceso',
            name='cortesusados',
            field=models.PositiveIntegerField(default=1, verbose_name=b'Cantidad de cortes Usados'),
        ),
        migrations.AlterField(
            model_name='reproceso',
            name='prodcreados',
            field=models.PositiveIntegerField(default=1, verbose_name=b'Cantidad de productos creados'),
        ),
    ]
