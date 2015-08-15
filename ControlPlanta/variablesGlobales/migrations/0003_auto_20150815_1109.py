# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('variablesGlobales', '0002_variableglobal_descripcion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='variableglobal',
            name='valortext',
            field=models.CharField(max_length=255, verbose_name=b'Valor texto', blank=True),
        ),
    ]
