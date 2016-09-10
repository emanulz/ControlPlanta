# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0008_auto_20160731_2017'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubFamiliaDelProducto',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255, verbose_name=b'nombre de la Sub-familia')),
            ],
            options={
                'ordering': ['id'],
                'verbose_name': 'Sub-Familia',
                'verbose_name_plural': '3. Sub-Familias',
            },
        ),
        migrations.AddField(
            model_name='producto',
            name='subcategory',
            field=models.ForeignKey(verbose_name=b'Familia', blank=True, to='productos.SubFamiliaDelProducto', null=True),
        ),
    ]
