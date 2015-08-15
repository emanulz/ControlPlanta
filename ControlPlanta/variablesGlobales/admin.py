# -*- coding: utf-8 -*-
from django.contrib import admin
from models import VariableGlobal

# Register your models here.
@admin.register(VariableGlobal)
class variableadmin(admin.ModelAdmin):
    list_display = ('id','descripcion','valornum','valortext')
    search_fields = ('id','descripcion','valornum','valortext')
