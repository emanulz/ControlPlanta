# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0007_producto_inventorypv'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='inventory',
            field=models.FloatField(default=0, verbose_name=b'Num de ref (dejar en cero)'),
        ),
    ]
