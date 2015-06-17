# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0005_remove_deshuese_productos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deshuese',
            name='mermakg',
            field=models.FloatField(null=True, verbose_name=b'Merma en Kg', blank=True),
        ),
        migrations.AlterField(
            model_name='deshuese',
            name='mermapor',
            field=models.FloatField(null=True, verbose_name=b'Merma en %', blank=True),
        ),
    ]
