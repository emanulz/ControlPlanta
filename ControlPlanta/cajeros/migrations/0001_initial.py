# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cajero',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre')),
                ('last_name', models.CharField(max_length=255, verbose_name=b'Apellidos')),
                ('identification', models.CharField(unique=True, max_length=255, verbose_name=b'C\xc3\xa9dula')),
                ('user', models.ForeignKey(verbose_name=b'Nombre de Usuario', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Cajeros',
            },
        ),
    ]
