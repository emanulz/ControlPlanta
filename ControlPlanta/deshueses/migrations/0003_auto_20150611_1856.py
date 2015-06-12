# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0002_auto_20150611_1129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalledeshuese',
            name='peso',
            field=models.FloatField(verbose_name=b'Peso en Kg'),
        ),
    ]
