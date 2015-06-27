# -*- coding: utf-8 -*-
from django.contrib import admin

# Register your models here.
from models import Cliente, ClientType, IdentificationType


@admin.register(Cliente)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'last_name', 'identification', 'adress', 'email', 'phone_number', 'isassociated', 'hascredit')
    # list_filter = ('name','identification')
    search_fields = ('name', 'identification', 'last_name', 'code' )

    def hascredit(self, obj):
        return obj.credit

    hascredit.admin_order_field = 'credit'
    hascredit.boolean = True
    hascredit.short_description = "Tiene crédito?"

    def isassociated(self, obj):
        return obj.associated
    isassociated.admin_order_field = 'associated'
    isassociated.boolean = True
    isassociated.short_description = "Es Asociado?"


@admin.register(ClientType)
class TipoClienteAdmin(admin.ModelAdmin):
    list_display = ('id','name')

@admin.register(IdentificationType)
class TipoIdAdmin(admin.ModelAdmin):
    list_display = ('id','name')