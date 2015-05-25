from django.contrib import admin

# Register your models here.
from lotes.models import Lote

@admin.register(Lote)
class lotesadmin(admin.ModelAdmin):
    list_display = ('id','lotenum','fierro','canalesqty','totalweight')
    search_fields = ('date','consecutive','fierro')
    filter_horizontal = ('canales',)