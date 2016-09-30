# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0010_subfamiliadelproducto_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='last_cost_change',
            field=models.DateField(null=True, verbose_name=b'\xc3\x9altimo cambio en costo'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='cost',
            field=models.FloatField(default=0, verbose_name=b'Costo \xe2\x82\xa1'),
        ),
    ]
