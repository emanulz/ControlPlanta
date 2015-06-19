# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
        ('lotes', '0006_auto_20150611_1906'),
    ]

    operations = [
        migrations.AddField(
            model_name='lote',
            name='tipo',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Carne', to='productos.FamiliaDelProducto'),
        ),
    ]
