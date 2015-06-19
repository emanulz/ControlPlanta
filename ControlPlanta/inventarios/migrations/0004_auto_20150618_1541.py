# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0003_inventariototal_tipo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventariototal',
            name='tipo',
            field=models.ForeignKey(default=1, verbose_name=b'Tipo de Carne', to='productos.FamiliaDelProducto'),
        ),
    ]
