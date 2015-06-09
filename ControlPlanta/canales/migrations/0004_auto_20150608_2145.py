# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0003_canal_isonlote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='canal',
            name='isonlote',
            field=models.BooleanField(default=False, verbose_name=b'Pertenece a lote?'),
        ),
    ]
