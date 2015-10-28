# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0002_auto_20150915_1739'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='identification',
            field=models.PositiveIntegerField(null=True, verbose_name=b'N\xc3\xbamero de c\xc3\xa9dula'),
        ),
        migrations.AlterField(
            model_name='proveedor',
            name='provcode',
            field=models.PositiveIntegerField(null=True, verbose_name=b'C\xc3\xb3digo de proveedor'),
        ),
    ]
