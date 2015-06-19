from django import forms
from django.contrib import admin
from lotes.models import Lote

# Register your models here.

@admin.register(Lote)
class lotesadmin(admin.ModelAdmin):
    list_display = ('id', 'lotenum', 'fierro', 'canalesqty', 'totalweight','date','tipo')
    search_fields = ('id','lotenum','fierro','date','tipo')
    filter_horizontal = ('canales',)







