# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0003_auto_20151021_1834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='description',
            field=models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n del gasto \xe2\x82\xa1', blank=True),
        ),
    ]
