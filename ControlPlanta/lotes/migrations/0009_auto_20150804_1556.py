# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0001_initial'),
        ('lotes', '0008_auto_20150618_1711'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lote',
            name='fierro',
        ),
        migrations.AddField(
            model_name='lote',
            name='fierro',
            field=models.ManyToManyField(to='proveedores.Proveedor', verbose_name=b'Fierros'),
        ),
    ]
