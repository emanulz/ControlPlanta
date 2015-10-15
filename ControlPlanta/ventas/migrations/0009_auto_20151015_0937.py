# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0008_venta_devuelto'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='conabono',
            field=models.BooleanField(default=0, verbose_name=b'Con abono?'),
        ),
        migrations.AddField(
            model_name='venta',
            name='connotacredito',
            field=models.BooleanField(default=0, verbose_name=b'Con nota cr\xc3\xa9dito?'),
        ),
    ]
