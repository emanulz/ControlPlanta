# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gastos', '0006_auto_20160916_0926'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gasto',
            name='description',
            field=models.CharField(max_length=255, verbose_name=b'Descripci\xc3\xb3n del gasto'),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='proveedor',
            field=models.ForeignKey(verbose_name=b'Proveedor', to='proveedores.Proveedor', null=True),
        ),
        migrations.AlterField(
            model_name='gasto',
            name='unidad',
            field=models.ForeignKey(verbose_name=b'Unidad', to='gastos.UnidadesGasto', null=True),
        ),
    ]
