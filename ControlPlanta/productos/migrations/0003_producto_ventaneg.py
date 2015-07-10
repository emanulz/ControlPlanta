# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_auto_20150626_1002'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='ventaneg',
            field=models.BooleanField(default=0, verbose_name=b'Venta en Negativo?'),
        ),
    ]
