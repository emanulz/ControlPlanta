# -*- coding: utf-8 -*-
from django.contrib import admin
from models import Venta

@admin.register(Venta)
class ventaadmin(admin.ModelAdmin):
    list_display = ('id', 'ticketnum','client','cashier')
    # list_filter = ('name','identification')
    search_fields = ('ticketnum','client','cashier' )

