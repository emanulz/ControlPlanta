# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IdentificationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Tipo de Identificaci\xc3\xb3n')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '3. Tipos de Identificaci\xf3n',
            },
        ),
        migrations.AlterField(
            model_name='cliente',
            name='identification',
            field=models.CharField(max_length=255, unique=True, null=True, verbose_name=b'Identificaci\xc3\xb3n', blank=True),
        ),
    ]
