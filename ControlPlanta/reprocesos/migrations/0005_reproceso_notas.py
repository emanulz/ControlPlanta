# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reprocesos', '0004_auto_20150824_0944'),
    ]

    operations = [
        migrations.AddField(
            model_name='reproceso',
            name='notas',
            field=models.CharField(max_length=255, null=True, verbose_name=b'Notas', blank=True),
        ),
    ]
