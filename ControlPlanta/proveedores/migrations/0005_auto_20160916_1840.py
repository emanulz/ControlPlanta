# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0004_auto_20160916_1837'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proveedor',
            name='identification',
            field=models.CharField(max_length=255, null=True, verbose_name=b'N\xc3\xbamero de Identificaci\xc3\xb3n'),
        ),
    ]
