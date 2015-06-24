# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_cliente_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='code',
            field=models.PositiveIntegerField(default=0, verbose_name=b'Codigo de Cliente'),
        ),
    ]
