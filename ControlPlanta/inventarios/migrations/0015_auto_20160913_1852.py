# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventarios', '0014_auto_20160731_2017'),
    ]

    operations = [
        migrations.AddField(
            model_name='entradasinventario',
            name='razon',
            field=models.CharField(default=b'', max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='razon',
            field=models.CharField(default=b'', max_length=100, null=True, blank=True),
        ),
    ]
