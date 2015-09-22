# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('devoluciones', '0003_auto_20150921_2027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devolucion',
            name='detalledevolucion',
            field=models.ManyToManyField(to='devoluciones.DetalleDev', null=True, verbose_name=b'Detalles de la Devoluci\xc3\xb3n'),
        ),
    ]
