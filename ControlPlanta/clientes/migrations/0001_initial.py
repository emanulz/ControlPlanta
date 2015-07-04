# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import clientes.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(unique=True, max_length=255, verbose_name=b'Codigo de Cliente')),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre')),
                ('last_name', models.CharField(max_length=255, null=True, verbose_name=b'Apellidos')),
                ('phone_number', models.CharField(default=clientes.models.phone_default, max_length=9, null=True, verbose_name=b'N\xc3\xbamero de tel\xc3\xa9fono', blank=True)),
                ('identification', models.CharField(max_length=255, unique=True, null=True, verbose_name=b'Identificaci\xc3\xb3n', blank=True)),
                ('adress', models.CharField(max_length=255, null=True, verbose_name=b'Direcci\xc3\xb3n', blank=True)),
                ('credit', models.BooleanField(default=0, verbose_name=b'Tiene cr\xc3\xa9dito?')),
                ('credit_limit', models.FloatField(default=0, verbose_name=b'L\xc3\xadmite de cr\xc3\xa9dito', blank=True)),
                ('email', models.EmailField(max_length=254, null=True, blank=True)),
                ('associated', models.BooleanField(default=0, verbose_name=b'Es asociado?')),
                ('associated_code', models.PositiveIntegerField(unique=True, null=True, verbose_name=b'N\xc3\xbamero de asociado', blank=True)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Clientes',
            },
        ),
        migrations.CreateModel(
            name='ClientType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Tipo de Cliente')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de cliente',
                'verbose_name_plural': '2. Tipos de Cliente',
            },
        ),
        migrations.CreateModel(
            name='IdentificationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Tipo de Identificaci\xc3\xb3n')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de identificaci\xf3n',
                'verbose_name_plural': '3. Tipos de Identificaci\xf3n',
            },
        ),
        migrations.AddField(
            model_name='cliente',
            name='clienttype',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Cliente', to='clientes.ClientType'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='identificationtype',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Identificaci\xc3\xb3n', to='clientes.IdentificationType'),
        ),
    ]
