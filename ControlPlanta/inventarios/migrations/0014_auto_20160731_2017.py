# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0013_auto_20151027_1846'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='entradasinventario',
            options={'ordering': ['id'], 'verbose_name': 'Entrada en Inventario', 'verbose_name_plural': '1. Entradas en Inventario'},
        ),
        migrations.AlterModelOptions(
            name='salidasinventario',
            options={'ordering': ['id'], 'verbose_name': 'Salida en Inventario', 'verbose_name_plural': '3. Salidas en Inventario'},
        ),
        migrations.AlterModelOptions(
            name='tiposentradas',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de entrada Inventario', 'verbose_name_plural': '2. Tipos de entradas Inventario'},
        ),
        migrations.AlterModelOptions(
            name='tipossalidas',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de salida Inventario', 'verbose_name_plural': '4. Tipos de salidas Inventario'},
        ),
        migrations.AlterField(
            model_name='entradasinventario',
            name='nuevopeso',
            field=models.FloatField(verbose_name=b'Nuevo Peso Kg'),
        ),
        migrations.AlterField(
            model_name='entradasinventario',
            name='pesoanterior',
            field=models.FloatField(default=0, verbose_name=b'Peso anterior Kg'),
        ),
        migrations.AlterField(
            model_name='salidasinventario',
            name='nuevopeso',
            field=models.FloatField(verbose_name=b'Nuevo Peso Kg'),
        ),
        migrations.AlterField(
            model_name='salidasinventario',
            name='pesoanterior',
            field=models.FloatField(default=0, verbose_name=b'Peso anterior Kg'),
        ),
    ]
