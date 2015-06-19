# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
        ('inventarios', '0002_auto_20150617_2004'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventariototal',
            name='tipo',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de corte', to='productos.FamiliaDelProducto'),
        ),
    ]
