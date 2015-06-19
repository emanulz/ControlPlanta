# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventariototal',
            name='vencimiento',
            field=models.DateField(default=b'2015-06-11', verbose_name=b'Fecha de vencimiento'),
        ),
    ]
