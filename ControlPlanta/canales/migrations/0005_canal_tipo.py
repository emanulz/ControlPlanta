# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
        ('canales', '0004_auto_20150608_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='canal',
            name='tipo',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Carne', to='productos.FamiliaDelProducto'),
        ),
    ]
