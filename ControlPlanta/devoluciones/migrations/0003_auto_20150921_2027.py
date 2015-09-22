# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('devoluciones', '0002_devolucion_notacredito'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devolucion',
            name='notacredito',
            field=models.ForeignKey(verbose_name=b'Nota de cr\xc3\xa9dito', to='cuentasCobrar.NotaDeCredito', null=True),
        ),
    ]
