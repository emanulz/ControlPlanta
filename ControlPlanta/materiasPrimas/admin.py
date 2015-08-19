from django.contrib import admin

# Register your models here.
from materiasPrimas.models import MateriaPrima, FamiliaDeLaMateria


@admin.register(MateriaPrima)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_code','description','bar_code','category','inventory')
    search_fields = ('product_code', 'description', 'bar_code', 'category__name','inventory')

@admin.register(FamiliaDeLaMateria)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('id','name')