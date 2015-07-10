# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0003_auto_20150709_2117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detallespago',
            name='autorizacion',
            field=models.IntegerField(null=True, verbose_name=b'Autorizaci\xc3\xb3n Datafono'),
        ),
        migrations.AlterField(
            model_name='detallespago',
            name='digitos',
            field=models.IntegerField(null=True, verbose_name=b'\xc3\x9altimos 4 d\xc3\xadgitos tarjeta'),
        ),
        migrations.AlterField(
            model_name='detallespago',
            name='montoefectivo',
            field=models.FloatField(null=True, verbose_name=b'Total de efectivo'),
        ),
        migrations.AlterField(
            model_name='detallespago',
            name='vuelto',
            field=models.FloatField(null=True, verbose_name=b'Vuelto'),
        ),
    ]
