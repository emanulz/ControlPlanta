# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0003_auto_20151027_1654'),
        ('gastos', '0004_auto_20151027_1654'),
    ]

    operations = [
        migrations.CreateModel(
            name='UnidadesGasto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name=b'Nombre de la unidad')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Tipo de Gasto',
                'verbose_name_plural': '3. Unidades',
            },
        ),
        migrations.AddField(
            model_name='gasto',
            name='cantidad',
            field=models.DecimalField(default=0, verbose_name=b'Cantidad', max_digits=11, decimal_places=2),
        ),
        migrations.AddField(
            model_name='gasto',
            name='proveedor',
            field=models.ForeignKey(verbose_name=b'Proveedor', blank=True, to='proveedores.Proveedor', null=True),
        ),
        migrations.AddField(
            model_name='gasto',
            name='unidad',
            field=models.ForeignKey(verbose_name=b'Unidad', blank=True, to='gastos.UnidadesGasto', null=True),
        ),
    ]
