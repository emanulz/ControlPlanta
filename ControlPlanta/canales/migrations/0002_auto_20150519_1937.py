# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='canal',
            name='fierro',
            field=models.ForeignKey(verbose_name=b'# de Fierro', to='proveedores.Proveedor'),
        ),
    ]
