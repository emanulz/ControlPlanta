# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0002_auto_20150519_1937'),
    ]

    operations = [
        migrations.AddField(
            model_name='canal',
            name='isonlote',
            field=models.BooleanField(default=0, verbose_name=b'Pertenece a lote?'),
            preserve_default=False,
        ),
    ]
