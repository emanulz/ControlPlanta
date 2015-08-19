# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('materiasPrimas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='materiaprima',
            name='cost',
            field=models.FloatField(default=0, verbose_name=b'Costo Kg \xe2\x82\xa1'),
        ),
    ]
