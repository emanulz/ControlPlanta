# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0003_auto_20151027_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='fierro',
            field=models.CharField(unique=True, max_length=255, verbose_name=b'C\xc3\xb3digo de proveedor'),
        ),
        migrations.AlterField(
            model_name='proveedor',
            name='provcode',
            field=models.PositiveIntegerField(null=True, verbose_name=b'C\xc3\xb3digo de Asociado(opcional)', blank=True),
        ),
    ]
