# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0009_auto_20160929_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deshuese',
            name='tipo',
            field=models.CharField(max_length=255, null=True, verbose_name=b'Tipo'),
        ),
    ]
