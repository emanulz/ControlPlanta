from django.contrib import admin

# Register your models here.
from reprocesos.models import Reproceso


@admin.register(Reproceso)
class InvTotalAdmin(admin.ModelAdmin):
    list_display = ('id','entrada','salida','cortesusados','cortesusadoskg','prodcreados','prodcreadoskg')
    search_fields = ('id','entrada','salida','cortesusados','cortesusadoskg','prodcreados','prodcreadoskg')