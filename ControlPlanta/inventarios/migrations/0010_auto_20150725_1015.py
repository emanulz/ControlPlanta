# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cajeros', '0001_initial'),
        ('inventarios', '0009_entradasinventario_cajero'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entradasinventario',
            name='cajero',
        ),
        migrations.AddField(
            model_name='entradasinventario',
            name='usuario',
            field=models.ForeignKey(default=1, verbose_name=b'usuario', to='cajeros.Cajero'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='nuevopeso',
            field=models.FloatField(default=1, verbose_name=b'Cantidad Kilogramos nueva'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='salidasinventario',
            name='usuario',
            field=models.ForeignKey(default=1, verbose_name=b'Usuario', to='cajeros.Cajero'),
            preserve_default=False,
        ),
    ]
