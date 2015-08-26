# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0006_auto_20150818_2102'),
        ('cuentasCobrar', '0005_auto_20150825_1138'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notadecredito',
            name='ventas',
        ),
        migrations.AddField(
            model_name='notadecredito',
            name='ventas',
            field=models.ForeignKey(default=1, verbose_name=b'Ventas asociadas', blank=True, to='ventas.Venta'),
            preserve_default=False,
        ),
    ]
