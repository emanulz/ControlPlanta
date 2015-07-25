# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0001_initial'),
        ('inventarios', '0008_entradasinventario_nuevopeso'),
    ]

    operations = [
        migrations.AddField(
            model_name='entradasinventario',
            name='cajero',
            field=models.ForeignKey(default=1, verbose_name=b'Cajero', to='cajeros.Cajero'),
            preserve_default=False,
        ),
    ]
