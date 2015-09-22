# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cuentasCobrar', '0009_notadecredito_detalle'),
        ('devoluciones', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='devolucion',
            name='notacredito',
            field=models.ForeignKey(default=1, verbose_name=b'Nota de cr\xc3\xa9dito', blank=True, to='cuentasCobrar.NotaDeCredito'),
            preserve_default=False,
        ),
    ]
