# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lotes', '0007_lote_tipo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lote',
            name='tipo',
            field=models.ForeignKey(verbose_name=b'Tipo de Carne', to='productos.FamiliaDelProducto'),
        ),
    ]
