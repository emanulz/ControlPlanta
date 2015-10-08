# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('devoluciones', '0005_auto_20150926_1027'),
    ]

    operations = [
        migrations.AddField(
            model_name='devolucion',
            name='totalcolones',
            field=models.FloatField(default=0, verbose_name=b'Total de devoluci\xc3\xb3n \xe2\x82\xa1'),
        ),
    ]
