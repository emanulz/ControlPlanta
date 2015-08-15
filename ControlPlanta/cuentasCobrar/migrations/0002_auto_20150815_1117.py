# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='abono',
            old_name='saldoreal',
            new_name='saldoactual',
        ),
    ]
