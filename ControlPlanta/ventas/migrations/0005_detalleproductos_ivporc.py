# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0004_auto_20150709_2211'),
    ]

    operations = [
        migrations.AddField(
            model_name='detalleproductos',
            name='ivporc',
            field=models.BooleanField(default=0, verbose_name=b'Porcentaje de impuestos %'),
            preserve_default=False,
        ),
    ]
