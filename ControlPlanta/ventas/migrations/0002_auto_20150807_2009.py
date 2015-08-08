# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipostarjeta',
            name='nombre',
            field=models.CharField(max_length=255, verbose_name=b'Nombre del Tipo de Tarjeta'),
        ),
    ]
