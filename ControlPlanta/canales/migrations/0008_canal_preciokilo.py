# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0007_canal_mediovendido'),
    ]

    operations = [
        migrations.AddField(
            model_name='canal',
            name='preciokilo',
            field=models.FloatField(default=0, verbose_name=b'Precio del canal por kilogramo'),
        ),
    ]
