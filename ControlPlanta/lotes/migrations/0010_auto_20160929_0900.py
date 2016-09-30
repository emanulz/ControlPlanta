# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0009_auto_20150804_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lote',
            name='fierro',
            field=models.ManyToManyField(to='proveedores.Proveedor', verbose_name=b'Proveedores'),
        ),
    ]
