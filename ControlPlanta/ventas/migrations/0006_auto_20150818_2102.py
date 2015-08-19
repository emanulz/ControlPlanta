# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0005_auto_20150814_1633'),
    ]

    operations = [
        migrations.AddField(
            model_name='detallespago',
            name='bancocheque',
            field=models.CharField(default=b'Nacional', max_length=255, verbose_name=b'Banco', blank=True),
        ),
        migrations.AddField(
            model_name='detallespago',
            name='bancotransf',
            field=models.CharField(default=b'Nacional', max_length=255, verbose_name=b'Banco', blank=True),
        ),
        migrations.AddField(
            model_name='detallespago',
            name='chequenum',
            field=models.IntegerField(default=0, verbose_name=b'N\xc3\xbamero de cheque', blank=True),
        ),
        migrations.AddField(
            model_name='detallespago',
            name='transfnum',
            field=models.IntegerField(default=0, verbose_name=b'N\xc3\xbamero de transferencia', blank=True),
        ),
    ]
