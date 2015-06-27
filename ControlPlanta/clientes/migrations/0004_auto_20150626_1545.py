# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_cliente_identificationtype'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='clienttype',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de cliente', 'verbose_name_plural': '2. Tipos de Cliente'},
        ),
        migrations.AlterModelOptions(
            name='identificationtype',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de identificaci\xf3n', 'verbose_name_plural': '3. Tipos de Identificaci\xf3n'},
        ),
    ]
