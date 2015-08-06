# -*- coding: utf-8 -*-
from django.contrib import admin

# Register your models here.
from canales.models import Canal


@admin.register(Canal)
class canaladmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'consecutive', 'weight', 'qualification', 'fierronum','tipo','isonlote','vendido')
    search_fields = ('date', 'consecutive', 'fierro', 'isonlote','tipo')








