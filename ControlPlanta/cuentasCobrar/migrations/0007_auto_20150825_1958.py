# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0006_auto_20150825_1958'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notadecredito',
            old_name='ventas',
            new_name='venta',
        ),
    ]
