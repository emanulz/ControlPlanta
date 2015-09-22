# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_remove_cliente_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='discount',
            field=models.FloatField(default=0, verbose_name=b'Descuento revendedor %', blank=True),
        ),
    ]
