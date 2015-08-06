# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0005_canal_tipo'),
    ]

    operations = [
        migrations.AddField(
            model_name='canal',
            name='vendido',
            field=models.BooleanField(default=False, verbose_name=b'vendido entero?'),
        ),
    ]
