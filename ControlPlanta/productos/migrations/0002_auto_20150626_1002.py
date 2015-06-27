# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='price',
        ),
        migrations.AddField(
            model_name='producto',
            name='autoprice',
            field=models.BooleanField(default=0, verbose_name=b'Precio Auto?'),
        ),
        migrations.AddField(
            model_name='producto',
            name='cost',
            field=models.FloatField(default=0, verbose_name=b'Costo Standard \xe2\x82\xa1'),
        ),
        migrations.AddField(
            model_name='producto',
            name='price1',
            field=models.FloatField(default=0, verbose_name=b'Precio Cliente \xe2\x82\xa1'),
        ),
        migrations.AddField(
            model_name='producto',
            name='price2',
            field=models.FloatField(default=0, verbose_name=b'Precio Distribuidor \xe2\x82\xa1'),
        ),
        migrations.AddField(
            model_name='producto',
            name='price3',
            field=models.FloatField(default=0, verbose_name=b'Precio Gobierno \xe2\x82\xa1'),
        ),
        migrations.AddField(
            model_name='producto',
            name='utility1',
            field=models.FloatField(default=0, verbose_name=b'Utilidad Cliente %:'),
        ),
        migrations.AddField(
            model_name='producto',
            name='utility2',
            field=models.FloatField(default=0, verbose_name=b'Utilidad Distribuidor %:'),
        ),
        migrations.AddField(
            model_name='producto',
            name='utility3',
            field=models.FloatField(default=0, verbose_name=b'Utilidad Gobierno %:'),
        ),
    ]
