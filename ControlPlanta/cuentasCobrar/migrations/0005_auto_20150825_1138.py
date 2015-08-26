# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0004_auto_20150825_1137'),
    ]

    operations = [
        migrations.RenameField(
            model_name='notadecredito',
            old_name='notasdecredito',
            new_name='ventas',
        ),
    ]
