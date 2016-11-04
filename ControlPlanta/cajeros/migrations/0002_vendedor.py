# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vendedor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre')),
                ('last_name', models.CharField(max_length=255, verbose_name=b'Apellidos')),
                ('identification', models.CharField(unique=True, max_length=255, verbose_name=b'C\xc3\xa9dula')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '2. Vendedores',
            },
        ),
    ]
