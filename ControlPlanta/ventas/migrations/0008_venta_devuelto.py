# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0007_auto_20150827_1502'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='devuelto',
            field=models.BooleanField(default=0, verbose_name=b'Con devoluci\xc3\xb3n?'),
        ),
    ]
