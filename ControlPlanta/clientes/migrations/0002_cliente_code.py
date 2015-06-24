# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='code',
            field=models.PositiveIntegerField(default=0, max_length=4, verbose_name=b'Codigo de Cliente'),
        ),
    ]
