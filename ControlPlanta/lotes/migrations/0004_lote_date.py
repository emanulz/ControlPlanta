# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0003_auto_20150608_1643'),
    ]

    operations = [
        migrations.AddField(
            model_name='lote',
            name='date',
            field=models.DateField(default=b'1988-05-10', verbose_name=b'Fecha'),
        ),
    ]
