# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_cliente_total'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cliente',
            name='total',
        ),
    ]
