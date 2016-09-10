# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0009_auto_20160909_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='subfamiliadelproducto',
            name='category',
            field=models.ForeignKey(default=1, verbose_name=b'Familia', to='productos.FamiliaDelProducto'),
        ),
    ]
