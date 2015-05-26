# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Prueba',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pregunta', models.CharField(max_length=255, verbose_name=b'pregunta')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Preguntas',
            },
        ),
    ]
