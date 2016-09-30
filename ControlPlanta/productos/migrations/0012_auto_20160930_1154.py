# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0011_auto_20160929_1806'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='cost2',
            field=models.FloatField(default=0, null=True, verbose_name=b'Costo \xe2\x82\xa1'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='cost',
            field=models.FloatField(default=0, verbose_name=b'Precio \xe2\x82\xa1'),
        ),
    ]
