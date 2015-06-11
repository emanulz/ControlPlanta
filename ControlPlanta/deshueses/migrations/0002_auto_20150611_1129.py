# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='detalledeshuese',
            options={'ordering': ['id'], 'verbose_name': 'Detalle deshuese', 'verbose_name_plural': '2. Detalles de deshuese'},
        ),
    ]
