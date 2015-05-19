from django.contrib import admin

# Register your models here.
from cajeros.models import Cajero


@admin.register(Cajero)
class CajeroAdmin(admin.ModelAdmin):
    list_display = ('id','name','last_name','identification','user')
    search_fields = ('id', 'name', 'identification', 'user')
