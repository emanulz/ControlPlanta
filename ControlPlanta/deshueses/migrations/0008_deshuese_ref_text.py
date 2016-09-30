# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0007_deshuese_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='deshuese',
            name='ref_text',
            field=models.CharField(max_length=110, null=True, verbose_name=b'Texto referencia', blank=True),
        ),
    ]
