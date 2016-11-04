# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0002_vendedor'),
        ('ventas', '0010_venta_cpnval'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='vendedor',
            field=models.ForeignKey(verbose_name=b'Vendedor', to='cajeros.Vendedor', null=True),
        ),
    ]
