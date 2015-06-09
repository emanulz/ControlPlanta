from django.contrib import admin
from django import forms
from django.contrib import admin


# Register your models here.
from lotes.models import Lote




@admin.register(Lote)
class lotesadmin(admin.ModelAdmin):
    list_display = ('id', 'lotenum', 'fierro', 'canalesqty', 'totalweight','date')
    search_fields = ('date', 'consecutive', 'fierro','date')
    filter_horizontal = ('canales',)







