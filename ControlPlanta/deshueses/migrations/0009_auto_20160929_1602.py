# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deshueses', '0008_deshuese_ref_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='deshuese',
            name='peso_lote',
            field=models.FloatField(null=True, verbose_name=b'Peso del Lote'),
        ),
        migrations.AddField(
            model_name='deshuese',
            name='tipo',
            field=models.PositiveIntegerField(null=True, verbose_name=b'Tipo'),
        ),
    ]
