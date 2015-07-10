# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0006_auto_20150709_1218'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='entradasinventario',
            options={'ordering': ['id'], 'verbose_name': 'Entrada en Inventario', 'verbose_name_plural': '3. Entradas en Inventario'},
        ),
        migrations.AlterModelOptions(
            name='salidasinventario',
            options={'ordering': ['id'], 'verbose_name': 'Salida en Inventario', 'verbose_name_plural': '5. Salidas en Inventario'},
        ),
        migrations.AlterModelOptions(
            name='tiposentradas',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de entrada Inventario', 'verbose_name_plural': '4. Tipos de entradas Inventario'},
        ),
        migrations.AlterModelOptions(
            name='tipossalidas',
            options={'ordering': ['id'], 'verbose_name': 'Tipo de salida Inventario', 'verbose_name_plural': '6. Tipos de salidas Inventario'},
        ),
    ]
