# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0006_auto_20150616_2000'),
    ]

    operations = [
        migrations.AddField(
            model_name='deshuese',
            name='date',
            field=models.DateField(null=True, verbose_name=b'Fecha'),
        ),
    ]
