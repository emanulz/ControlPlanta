# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0005_lote_isondeshuese'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lote',
            name='date',
            field=models.DateField(default=b'2015-06-11', verbose_name=b'Fecha'),
        ),
    ]
