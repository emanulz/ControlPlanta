# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0005_auto_20150709_1217'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resumeninventario',
            name='producto',
            field=models.OneToOneField(verbose_name=b'Corte', to='productos.Producto'),
        ),
    ]
