# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('variablesGlobales', '0003_auto_20150815_1109'),
    ]

    operations = [
        migrations.AddField(
            model_name='variableglobal',
            name='valoremail',
            field=models.EmailField(max_length=254, verbose_name=b'Email', blank=True),
        ),
    ]
