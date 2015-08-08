# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0003_venta_saldo'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='anulada',
            field=models.BooleanField(default=0, verbose_name=b'Factura anulada?'),
        ),
    ]
