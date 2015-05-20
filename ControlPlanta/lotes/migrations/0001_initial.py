# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lotenum', models.CharField(max_length=255, verbose_name=b'# de Lote')),
                ('fierro', models.CharField(max_length=255, verbose_name=b'# de Fierro')),
                ('canalesqty', models.PositiveIntegerField(verbose_name=b'Cantidad de canales')),
                ('totalweight', models.FloatField(verbose_name=b'Peso total del lote Kg')),
                ('canales', models.ManyToManyField(to='canales.Canal', verbose_name=b'Canales')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Lotes',
            },
        ),
    ]
