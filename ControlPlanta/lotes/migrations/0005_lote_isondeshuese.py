# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0004_lote_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='lote',
            name='isondeshuese',
            field=models.BooleanField(default=0, verbose_name=b'Se ha deshuesado?'),
        ),
    ]
