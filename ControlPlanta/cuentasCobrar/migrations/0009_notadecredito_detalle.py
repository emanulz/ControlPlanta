# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0008_auto_20150826_1737'),
    ]

    operations = [
        migrations.AddField(
            model_name='notadecredito',
            name='detalle',
            field=models.CharField(default=b'', max_length=255, verbose_name=b'Detalle de la Nota de cr\xc3\xa9dito', blank=True),
        ),
    ]
