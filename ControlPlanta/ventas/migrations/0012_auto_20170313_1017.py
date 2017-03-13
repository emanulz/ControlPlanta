# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0011_venta_vendedor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='cpnval',
            field=models.TextField(default=0, max_length=255, verbose_name=b'Ordenes de compra del CNP'),
        ),
    ]
