# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0004_cliente_discount'),
        ('devoluciones', '0006_devolucion_totalcolones'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='devolucion',
            name='notacredito',
        ),
        migrations.AddField(
            model_name='devolucion',
            name='cliente',
            field=models.ForeignKey(default=1, verbose_name=b'Cliente', to='clientes.Cliente'),
            preserve_default=False,
        ),
    ]
