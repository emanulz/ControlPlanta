# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0007_auto_20150825_1958'),
    ]

    operations = [
        migrations.AddField(
            model_name='notadecredito',
            name='saldoactualfact',
            field=models.FloatField(default=0, verbose_name=b'Saldo de la factura despu\xc3\xa9s de aplicar'),
        ),
        migrations.AddField(
            model_name='notadecredito',
            name='saldoanteriorfact',
            field=models.FloatField(default=0, verbose_name=b'Saldo de la factura antes de aplicar'),
        ),
    ]
