# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0005_auto_20160916_1840'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='lastname',
            field=models.CharField(max_length=255, null=True, verbose_name=b'Apellido', blank=True),
        ),
    ]
