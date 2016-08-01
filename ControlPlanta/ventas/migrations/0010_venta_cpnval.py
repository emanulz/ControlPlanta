# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0009_auto_20151015_0937'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='cpnval',
            field=models.CharField(default=0, max_length=255, verbose_name=b'Ordenes de compra del CNP'),
        ),
    ]
