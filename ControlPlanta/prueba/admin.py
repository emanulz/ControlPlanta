from django.contrib import admin

# Register your models here.
from prueba.models import Prueba


@admin.register(Prueba)
class pruebaadmin(admin.ModelAdmin):
    list_display = ('pregunta',)
