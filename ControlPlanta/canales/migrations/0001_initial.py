# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('proveedores', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Canal',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name=b'Fecha')),
                ('consecutive', models.PositiveIntegerField(verbose_name=b'Consecutivo Matadero')),
                ('weight', models.FloatField(verbose_name=b'Peso del canal Kg')),
                ('qualification', models.CharField(max_length=255, verbose_name=b'Clasificaci\xc3\xb3n', choices=[('AA', 'AA'), ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')])),
                ('fierro', models.ForeignKey(to='proveedores.Proveedor', to_field=b'fierro', verbose_name=b'# de Fierro')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name_plural': '1. Canales',
            },
        ),
    ]
