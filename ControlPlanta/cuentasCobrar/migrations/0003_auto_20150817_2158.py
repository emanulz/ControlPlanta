# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0002_auto_20150815_1117'),
    ]

    operations = [
        migrations.RenameField(
            model_name='abono',
            old_name='banco',
            new_name='bancocheque',
        ),
        migrations.AddField(
            model_name='abono',
            name='bancotransf',
            field=models.CharField(max_length=255, verbose_name=b'Banco', blank=True),
        ),
    ]
