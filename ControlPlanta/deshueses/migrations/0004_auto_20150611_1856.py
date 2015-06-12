# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0003_auto_20150611_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalledeshuese',
            name='peso',
            field=models.FloatField(default=0, verbose_name=b'Peso en Kg'),
        ),
        migrations.AlterField(
            model_name='detalledeshuese',
            name='producto',
            field=models.ForeignKey(default=1, verbose_name=b'Corte', to='productos.Producto'),
        ),
    ]
