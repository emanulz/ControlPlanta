# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0005_detalleproductos_ivporc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detalleproductos',
            name='ivporc',
        ),
    ]
