# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0007_auto_20160916_0927'),
    ]

    operations = [
        migrations.AddField(
            model_name='gasto',
            name='code',
            field=models.CharField(max_length=15, unique=True, null=True, verbose_name=b'C\xc3\xb3digo del gasto'),
        ),
    ]
