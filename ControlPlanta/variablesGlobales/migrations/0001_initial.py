# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VariableGlobal',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=255, verbose_name=b'Nombre')),
                ('valornum', models.FloatField(default=0, verbose_name=b'Valor Num\xc3\xa9rico', blank=True)),
                ('valortext', models.CharField(max_length=255, verbose_name=b'Valor Num\xc3\xa9rico', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Variable Global',
                'verbose_name_plural': '1. Variables Globales',
            },
        ),
    ]
