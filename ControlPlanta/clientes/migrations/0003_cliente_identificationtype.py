# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_auto_20150626_1209'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='identificationtype',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Identificaci\xc3\xb3n', to='clientes.IdentificationType'),
        ),
    ]
