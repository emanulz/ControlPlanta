# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lote',
            name='lotenum',
            field=models.CharField(unique=True, max_length=255, verbose_name=b'# de Lote'),
        ),
    ]
