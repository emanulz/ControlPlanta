# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canales', '0006_canal_vendido'),
    ]

    operations = [
        migrations.AddField(
            model_name='canal',
            name='mediovendido',
            field=models.BooleanField(default=False, verbose_name=b'Ya se vendi\xc3\xb3 medio?'),
        ),
    ]
