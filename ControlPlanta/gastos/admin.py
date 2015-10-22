from django.contrib import admin

# Register your models here.
from gastos.models import Gasto, TipoGasto


@admin.register(Gasto)
class gastoadmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'tipo', 'description')
    search_fields = ('id', 'amount', 'tipo', 'description')


@admin.register(TipoGasto)
class tipogastoadmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name' )