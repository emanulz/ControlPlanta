# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0010_auto_20160929_1607'),
    ]

    operations = [
        migrations.AddField(
            model_name='deshuese',
            name='desechokg',
            field=models.FloatField(default=0, null=True, verbose_name=b'Desecho en Kg', blank=True),
        ),
    ]
