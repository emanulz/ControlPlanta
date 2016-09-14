# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404


import datetime
import os
import socket
import StringIO
import xlsxwriter
from django.shortcuts import render
from django.http import HttpResponse

from ventas.models import Venta, DetalleProductos
from productos.models import FamiliaDelProducto, SubFamiliaDelProducto

# Create your views here.
from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = 'landing.html'


class TrazabilidadView(TemplateView):
    template_name = 'trazabilidad.html'


@login_required(login_url='/admin/login/')
def backupdbmine(request):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if request.is_ajax():
        if socket.gethostname().startswith('Mac'):
            os.system(BASE_DIR+'/dbbackup/backupdb.command')
            return JsonResponse({'status': 'success', 'system': 'MAC', 'dir': BASE_DIR})
        else:
            os.system(BASE_DIR+'/dbbackup/backupdb.bat')
            return JsonResponse({'status': 'Success', 'system': 'Windows', 'dir': BASE_DIR})
    else:
        raise Http404


def xls_report(request):

    date_ini = request.GET['date_ini']
    date_end = request.GET['date_end']

    family = request.GET['family']
    subfamily = request.GET['subfamily']

    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename=Detalleado_Art.xlsx'
    xlsx_data = write_to_excel(date_ini, date_end, family, subfamily)
    response.write(xlsx_data)
    return response


def write_to_excel(date_ini, date_end, family, subfamily):

    output = StringIO.StringIO()
    workbook = xlsxwriter.Workbook(output)

    # Here we will adding the code to add data
    worksheet_s = workbook.add_worksheet("Reporte detallado")

    title = workbook.add_format({
        'bold': True,
        'font_size': 14,
        'align': 'center',
        'valign': 'vcenter'
    })

    header = workbook.add_format({
        'bg_color': '#59ff59',
        'color': 'black',
        'align': 'center',
        'valign': 'top',
        'border': 1
    })

    cell_center = workbook.add_format({

        'align': 'center',

    })

    title_text = u"{0}".format("Reporte de Ventas detallado por articulo y factura")
    worksheet_s.merge_range('A1:H1', title_text, title)

    worksheet_s.write(2, 0, 'Fecha', cell_center)
    worksheet_s.write(3, 0, 'Del :', cell_center)
    worksheet_s.write(4, 0, 'Al :', cell_center)

    worksheet_s.write(3, 6, 'Familia :', cell_center)
    worksheet_s.write(4, 6, 'Sub-Familia :', cell_center)

    if family == "0":
        familia = "Todas"
    else:
        familia = FamiliaDelProducto.objects.get(pk=family)
        familia = familia.name

    if subfamily == "0":
        subfamilia = "Todas"
    else:
        subfamilia = SubFamiliaDelProducto.objects.get(pk=subfamily)
        subfamilia = subfamilia.name

    worksheet_s.write(3, 7, familia, header)
    worksheet_s.write(4, 7, subfamilia, header)

    formated_date1 = datetime.datetime.strptime(date_ini, "%Y-%m-%d").date()
    formated_date2 = datetime.datetime.strptime(date_end, "%Y-%m-%d").date()

    worksheet_s.write(3, 1, formated_date1.strftime('%d/%m/%Y'), header)
    worksheet_s.write(4, 1, formated_date2.strftime('%d/%m/%Y'), header)

    worksheet_s.write(6, 0, 'No Factura', header)
    worksheet_s.write(6, 1, "Fecha", header)
    worksheet_s.write(6, 2, "Código", header)
    worksheet_s.write(6, 3, "Artículo", header)
    worksheet_s.write(6, 4, "Unidad", header)
    worksheet_s.write(6, 5, "Cantidad", header)
    worksheet_s.write(6, 6, "Precio Unitario", header)
    worksheet_s.write(6, 7, "Total", header)

    ventas = Venta.objects.filter(anulada=False, date__range=[date_ini, date_end])

    control = 0
    cant_tot = 0
    total = 0

    for data in ventas:

        detalleprod = []

        if family == "0":

            detalleprod = data.detalleproductos.all()

        if family != "0" and subfamily == "0":

            detalleprod = data.detalleproductos.filter(producto__category=family)

        if family != "0" and subfamily != "0":

            detalleprod = data.detalleproductos.filter(producto__category=family, producto__subcategory=subfamily)

        for detalle in detalleprod:

            row = control+7

            worksheet_s.write(row, 0, data.id, cell_center)
            worksheet_s.write(row, 1, data.date.strftime('%d/%m/%Y'), cell_center)
            worksheet_s.write(row, 2, detalle.producto.product_code, cell_center)
            worksheet_s.write(row, 3, detalle.description, cell_center)
            worksheet_s.write(row, 4, 'Kg', cell_center)
            worksheet_s.write(row, 5, detalle.cantidad, cell_center)
            worksheet_s.write(row, 6, detalle.preciouni, cell_center)
            worksheet_s.write(row, 7, detalle.total, cell_center)

            cant_tot += detalle.cantidad
            total += detalle.total
            control += 1

    worksheet_s.write(control + 7 + 1, 0, 'Totales', header)
    worksheet_s.write(control + 7 + 1, 1, '', header)
    worksheet_s.write(control + 7 + 1, 2, '', header)
    worksheet_s.write(control + 7 + 1, 3, '', header)
    worksheet_s.write(control + 7 + 1, 4, '', header)
    worksheet_s.write(control + 7 + 1, 5, cant_tot, header)
    worksheet_s.write(control + 7 + 1, 6, '', header)
    worksheet_s.write(control + 7 + 1, 7, total, header)

    worksheet_s.set_column('B:B', 9)
    worksheet_s.set_column('C:C', 7)
    worksheet_s.set_column('D:D', 25)
    worksheet_s.set_column('G:G', 12)
    worksheet_s.set_column('H:H', 13)

    workbook.close()
    xlsx_data = output.getvalue()
    # xlsx_data contains the Excel file
    return xlsx_data


def xls_resumen_articulo(request):

    date_ini = request.GET['date_ini']
    date_end = request.GET['date_end']

    family = request.GET['family']
    subfamily = request.GET['subfamily']

    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename=Resumen_Art.xlsx'
    xlsx_data = write_to_excel_resumen_articulo(date_ini, date_end, family, subfamily)
    response.write(xlsx_data)
    return response


def write_to_excel_resumen_articulo(date_ini, date_end, family, subfamily):

    output = StringIO.StringIO()
    workbook = xlsxwriter.Workbook(output)

    # Here we will adding the code to add data
    worksheet_s = workbook.add_worksheet("Reporte resumen por articulo")

    title = workbook.add_format({
        'bold': True,
        'font_size': 14,
        'align': 'center',
        'valign': 'vcenter'
    })

    header = workbook.add_format({
        'bg_color': '#59ff59',
        'color': 'black',
        'align': 'center',
        'valign': 'top',
        'border': 1
    })

    cell_center = workbook.add_format({

        'align': 'center',

    })

    title_text = u"{0}".format("Reporte de Ventas resumen por articulo")
    worksheet_s.merge_range('A1:H1', title_text, title)

    worksheet_s.write(2, 0, 'Fecha', cell_center)
    worksheet_s.write(3, 0, 'Del :', cell_center)
    worksheet_s.write(4, 0, 'Al :', cell_center)

    worksheet_s.write(3, 3, 'Familia :', cell_center)
    worksheet_s.write(4, 3, 'Sub-Familia :', cell_center)

    if family == "0":
        familia = "Todas"
    else:
        familia = FamiliaDelProducto.objects.get(pk=family)
        familia = familia.name

    if subfamily == "0":
        subfamilia = "Todas"
    else:
        subfamilia = SubFamiliaDelProducto.objects.get(pk=subfamily)
        subfamilia = subfamilia.name

    worksheet_s.write(3, 4, familia, header)
    worksheet_s.write(4, 4, subfamilia, header)

    formated_date1 = datetime.datetime.strptime(date_ini, "%Y-%m-%d").date()
    formated_date2 = datetime.datetime.strptime(date_end, "%Y-%m-%d").date()

    worksheet_s.write(3, 1, formated_date1.strftime('%d/%m/%Y'), header)
    worksheet_s.write(4, 1, formated_date2.strftime('%d/%m/%Y'), header)

    worksheet_s.write(6, 0, "Cod Artículo", header)
    worksheet_s.write(6, 1, "Artículo", header)
    worksheet_s.write(6, 2, "Unidad", header)
    worksheet_s.write(6, 3, "Cantidades", header)
    worksheet_s.write(6, 4, "Precio Promedio", header)
    worksheet_s.write(6, 5, "Total", header)
    worksheet_s.write(6, 6, "Relación", header)

    ventas = Venta.objects.filter(anulada=False, date__range=[date_ini, date_end])

    cant_tot = 0
    total = 0

    details_array = []

    for data in ventas:

        detalleprod = []

        if family == "0":

            detalleprod = data.detalleproductos.all()

        if family != "0" and subfamily == "0":

            detalleprod = data.detalleproductos.filter(producto__category=family)

        if family != "0" and subfamily != "0":

            detalleprod = data.detalleproductos.filter(producto__category=family, producto__subcategory=subfamily)

        for detalle in detalleprod:

            i = 0

            for list_ in details_array:
                if detalle.producto.product_code in list_:
                    break
                i += 1

            if len(details_array) == i:

                details_array.append([detalle.producto.product_code, detalle.description, 'kg', detalle.cantidad, 0, 0, 0, detalle.cantidad*detalle.preciouni])

            else:
                details_array[i][1] = detalle.description
                details_array[i][3] = details_array[i][3] + detalle.cantidad
                details_array[i][7] = details_array[i][7] + (detalle.cantidad*detalle.preciouni)

    for line in details_array:

        qty = line[3]
        total_sales = line[7]

        price_prom = total_sales/qty
        total_price = (price_prom * qty)

        line[4] = price_prom
        line[5] = total_price

        cant_tot = cant_tot+qty
        total = total + total_price

    for line in details_array:
        line[6] = (line[3]*100) / cant_tot

    control = 0

    for line in details_array:
        row = control + 7

        worksheet_s.write(row, 0, line[0], cell_center)
        worksheet_s.write(row, 1, line[1], cell_center)
        worksheet_s.write(row, 2, line[2], cell_center)
        worksheet_s.write(row, 3, line[3], cell_center)
        worksheet_s.write(row, 4, line[4], cell_center)
        worksheet_s.write(row, 5, line[5], cell_center)
        worksheet_s.write(row, 6, line[6], cell_center)

        control += 1

    worksheet_s.write(control + 7 + 1, 0, 'Totales', header)
    worksheet_s.write(control + 7 + 1, 1, '', header)
    worksheet_s.write(control + 7 + 1, 2, '', header)
    worksheet_s.write(control + 7 + 1, 3, cant_tot, header)
    worksheet_s.write(control + 7 + 1, 4, '', header)
    worksheet_s.write(control + 7 + 1, 5, total, header)
    worksheet_s.write(control + 7 + 1, 6, '100%', header)

    worksheet_s.set_column('B:B', 25)
    worksheet_s.set_column('C:C', 7)
    worksheet_s.set_column('D:D', 15)
    worksheet_s.set_column('E:E', 15)
    worksheet_s.set_column('G:G', 15)
    worksheet_s.set_column('H:H', 15)

    workbook.close()
    xlsx_data = output.getvalue()
    # xlsx_data contains the Excel file
    return xlsx_data


def xls_resumen_familia(request):

    date_ini = request.GET['date_ini']
    date_end = request.GET['date_end']

    family = request.GET['family']
    subfamily = request.GET['subfamily']

    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename=Resumen_Familia.xlsx'
    xlsx_data = write_to_excel_resumen_familia(date_ini, date_end, family, subfamily)
    response.write(xlsx_data)
    return response


def write_to_excel_resumen_familia(date_ini, date_end, family, subfamily):

    output = StringIO.StringIO()
    workbook = xlsxwriter.Workbook(output)

    # Here we will adding the code to add data
    worksheet_s = workbook.add_worksheet("Reporte resumen por articulo")

    title = workbook.add_format({
        'bold': True,
        'font_size': 14,
        'align': 'center',
        'valign': 'vcenter'
    })

    header = workbook.add_format({
        'bg_color': '#59ff59',
        'color': 'black',
        'align': 'center',
        'valign': 'top',
        'border': 1
    })

    cell_center = workbook.add_format({

        'align': 'center',

    })

    title_text = u"{0}".format("Reporte de Ventas resumen por Familia y Subfamilia")
    worksheet_s.merge_range('A1:H1', title_text, title)

    worksheet_s.write(2, 0, 'Fecha', cell_center)
    worksheet_s.write(3, 0, 'Del :', cell_center)
    worksheet_s.write(4, 0, 'Al :', cell_center)

    worksheet_s.write(3, 3, 'Familia :', cell_center)
    worksheet_s.write(4, 3, 'Sub-Familia :', cell_center)

    if family == "0":
        familia = "Todas"
    else:
        familia = FamiliaDelProducto.objects.get(pk=family)
        familia = familia.name

    if subfamily == "0":
        subfamilia = "Todas"
    else:
        subfamilia = SubFamiliaDelProducto.objects.get(pk=subfamily)
        subfamilia = subfamilia.name

    worksheet_s.write(3, 4, familia, header)
    worksheet_s.write(4, 4, subfamilia, header)

    formated_date1 = datetime.datetime.strptime(date_ini, "%Y-%m-%d").date()
    formated_date2 = datetime.datetime.strptime(date_end, "%Y-%m-%d").date()

    worksheet_s.write(3, 1, formated_date1.strftime('%d/%m/%Y'), header)
    worksheet_s.write(4, 1, formated_date2.strftime('%d/%m/%Y'), header)

    worksheet_s.write(6, 0, "Cod Categoría", header)
    worksheet_s.write(6, 1, "Categoría", header)
    worksheet_s.write(6, 2, "Cantidades", header)
    worksheet_s.write(6, 3, "Precio Promedio", header)
    worksheet_s.write(6, 4, "Total", header)
    worksheet_s.write(6, 5, "Relación", header)

    ventas = Venta.objects.filter(anulada=False, date__range=[date_ini, date_end])

    cant_tot = 0
    total = 0

    cant_tot2 = 0
    total2 = 0

    category_details_array = []
    subcategory_details_array = []

    for data in ventas:

        detalleprod = []

        if family == "0":

            detalleprod = data.detalleproductos.all()

        if family != "0" and subfamily == "0":

            detalleprod = data.detalleproductos.filter(producto__category=family)

        if family != "0" and subfamily != "0":

            detalleprod = data.detalleproductos.filter(producto__category=family, producto__subcategory=subfamily)

        for detalle in detalleprod:

            i = 0

            for list_ in category_details_array:
                if detalle.producto.category_id in list_:
                    break
                i += 1

            if len(category_details_array) == i:
                category = FamiliaDelProducto.objects.get(pk=detalle.producto.category_id)
                category_details_array.append([detalle.producto.category_id, category.name, detalle.cantidad, 0, 0, 0, detalle.cantidad*detalle.preciouni])

            else:
                category_details_array[i][2] = category_details_array[i][2] + detalle.cantidad
                category_details_array[i][6] = category_details_array[i][6] + (detalle.cantidad*detalle.preciouni)

        for detalle in detalleprod:

            i = 0

            for list_ in subcategory_details_array:
                if detalle.producto.subcategory_id in list_:
                    break
                i += 1

            if len(subcategory_details_array) == i:

                subcategory = SubFamiliaDelProducto.objects.filter(pk=detalle.producto.subcategory_id)

                if hasattr(subcategory, 'name'):

                    subcategory_details_array.append([detalle.producto.subcategory_id, subcategory.name, detalle.cantidad, 0, 0, 0, detalle.cantidad*detalle.preciouni])
                else:
                    subcategory_details_array.append(
                        [detalle.producto.subcategory_id, 'Sin Sub-Category', detalle.cantidad, 0, 0, 0,
                         detalle.cantidad * detalle.preciouni])

            else:
                subcategory_details_array[i][2] = subcategory_details_array[i][2] + detalle.cantidad
                subcategory_details_array[i][6] = subcategory_details_array[i][6] + (detalle.cantidad*detalle.preciouni)

    for line in category_details_array:

        qty = line[2]
        total_sales = line[6]

        price_prom = total_sales/qty
        total_price = (price_prom * qty)

        line[3] = price_prom
        line[4] = total_price

        cant_tot = cant_tot+qty
        total = total + total_price

    for line in category_details_array:
        line[5] = (line[2]*100) / cant_tot

    for line in subcategory_details_array:

        qty2 = line[2]
        total_sales2 = line[6]

        price_prom2 = total_sales2/qty2
        total_price2 = (price_prom2 * qty2)

        line[3] = price_prom2
        line[4] = total_price2

        cant_tot2 = cant_tot2+qty2
        total2 = total2 + total_price2

    for line in subcategory_details_array:
        line[5] = (line[2]*100) / cant_tot

    control = 0

    for line in category_details_array:
        row = control + 7

        worksheet_s.write(row, 0, line[0], cell_center)
        worksheet_s.write(row, 1, line[1], cell_center)
        worksheet_s.write(row, 2, line[2], cell_center)
        worksheet_s.write(row, 3, line[3], cell_center)
        worksheet_s.write(row, 4, line[4], cell_center)
        worksheet_s.write(row, 5, line[5], cell_center)

        control += 1

    worksheet_s.write(control + 7 + 1, 0, 'Totales', header)
    worksheet_s.write(control + 7 + 1, 1, '', header)
    worksheet_s.write(control + 7 + 1, 2, cant_tot, header)
    worksheet_s.write(control + 7 + 1, 3, '', header)
    worksheet_s.write(control + 7 + 1, 4, total, header)
    worksheet_s.write(control + 7 + 1, 5, '100%', header)

    control += 3
    row = control + 7

    worksheet_s.write(row, 0, "Cod Sub-Categoría", header)
    worksheet_s.write(row, 1, "Sub-Categoría", header)
    worksheet_s.write(row, 2, "Cantidades", header)
    worksheet_s.write(row, 3, "Precio Promedio", header)
    worksheet_s.write(row, 4, "Total", header)
    worksheet_s.write(row, 5, "Relación", header)
    control += 1

    for line in subcategory_details_array:

        row = control + 7

        worksheet_s.write(row, 0, line[0], cell_center)
        worksheet_s.write(row, 1, line[1], cell_center)
        worksheet_s.write(row, 2, line[2], cell_center)
        worksheet_s.write(row, 3, line[3], cell_center)
        worksheet_s.write(row, 4, line[4], cell_center)
        worksheet_s.write(row, 5, line[5], cell_center)

        control += 1

    worksheet_s.write(control + 7 + 1, 0, 'Totales', header)
    worksheet_s.write(control + 7 + 1, 1, '', header)
    worksheet_s.write(control + 7 + 1, 2, cant_tot2, header)
    worksheet_s.write(control + 7 + 1, 3, '', header)
    worksheet_s.write(control + 7 + 1, 4, total2, header)
    worksheet_s.write(control + 7 + 1, 5, '100%', header)

    worksheet_s.set_column('A:A', 25)
    worksheet_s.set_column('B:B', 25)
    worksheet_s.set_column('C:C', 15)
    worksheet_s.set_column('D:D', 15)
    worksheet_s.set_column('E:E', 15)

    workbook.close()
    xlsx_data = output.getvalue()
    # xlsx_data contains the Excel file
    return xlsx_data


def xls_resumen_cliente(request):

    date_ini = request.GET['date_ini']
    date_end = request.GET['date_end']

    family = request.GET['family']
    subfamily = request.GET['subfamily']

    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename=Resumen_Cliente.xlsx'
    xlsx_data = write_to_excel_resumen_cliente(date_ini, date_end, family, subfamily)
    response.write(xlsx_data)
    return response


def write_to_excel_resumen_cliente(date_ini, date_end, family, subfamily):

    output = StringIO.StringIO()
    workbook = xlsxwriter.Workbook(output)

    # Here we will adding the code to add data
    worksheet_s = workbook.add_worksheet("Reporte resumen por articulo")

    title = workbook.add_format({
        'bold': True,
        'font_size': 14,
        'align': 'center',
        'valign': 'vcenter'
    })

    header = workbook.add_format({
        'bg_color': '#59ff59',
        'color': 'black',
        'align': 'center',
        'valign': 'top',
        'border': 1
    })

    cell_center = workbook.add_format({

        'align': 'center',

    })

    title_text = u"{0}".format("Reporte de Ventas resumen por articulo")
    worksheet_s.merge_range('A1:H1', title_text, title)

    worksheet_s.write(2, 0, 'Fecha', cell_center)
    worksheet_s.write(3, 0, 'Del :', cell_center)
    worksheet_s.write(4, 0, 'Al :', cell_center)

    worksheet_s.write(3, 3, 'Familia :', cell_center)
    worksheet_s.write(4, 3, 'Sub-Familia :', cell_center)

    if family == "0":
        familia = "Todas"
    else:
        familia = FamiliaDelProducto.objects.get(pk=family)
        familia = familia.name

    if subfamily == "0":
        subfamilia = "Todas"
    else:
        subfamilia = SubFamiliaDelProducto.objects.get(pk=subfamily)
        subfamilia = subfamilia.name

    worksheet_s.write(3, 4, familia, header)
    worksheet_s.write(4, 4, subfamilia, header)

    formated_date1 = datetime.datetime.strptime(date_ini, "%Y-%m-%d").date()
    formated_date2 = datetime.datetime.strptime(date_end, "%Y-%m-%d").date()

    worksheet_s.write(3, 1, formated_date1.strftime('%d/%m/%Y'), header)
    worksheet_s.write(4, 1, formated_date2.strftime('%d/%m/%Y'), header)

    worksheet_s.write(6, 0, "Cod Cliente", header)
    worksheet_s.write(6, 1, "Cliente", header)
    worksheet_s.write(6, 2, "Cantidades", header)
    worksheet_s.write(6, 3, "Precio Promedio", header)
    worksheet_s.write(6, 4, "Total", header)
    worksheet_s.write(6, 5, "Relación", header)

    ventas = Venta.objects.filter(anulada=False, date__range=[date_ini, date_end])

    cant_tot = 0
    total = 0

    details_array = []

    for data in ventas:

        detalleprod = []

        if family == "0":

            detalleprod = data.detalleproductos.all().select_related()

        if family != "0" and subfamily == "0":

            detalleprod = data.detalleproductos.filter(producto__category=family)

        if family != "0" and subfamily != "0":

            detalleprod = data.detalleproductos.filter(producto__category=family, producto__subcategory=subfamily)

        for detalle in detalleprod:

            i = 0

            for list_ in details_array:
                if data.client.code in list_:
                    break
                i += 1

            if len(details_array) == i:

                details_array.append([data.client.code, data.client.name+' '+data.client.last_name, detalle.cantidad, 0, 0, 0, detalle.cantidad*detalle.preciouni])

            else:
                details_array[i][2] = details_array[i][2] + detalle.cantidad
                details_array[i][6] = details_array[i][6] + (detalle.cantidad*detalle.preciouni)

    for line in details_array:

        qty = line[2]
        total_sales = line[6]

        price_prom = total_sales/qty
        total_price = (price_prom * qty)

        line[3] = price_prom
        line[4] = total_price

        cant_tot = cant_tot+qty
        total = total + total_price

    for line in details_array:
        line[5] = (line[2]*100) / cant_tot

    control = 0

    for line in details_array:
        row = control + 7

        worksheet_s.write(row, 0, line[0], cell_center)
        worksheet_s.write(row, 1, line[1], cell_center)
        worksheet_s.write(row, 2, line[2], cell_center)
        worksheet_s.write(row, 3, line[3], cell_center)
        worksheet_s.write(row, 4, line[4], cell_center)
        worksheet_s.write(row, 5, line[5], cell_center)

        control += 1

    worksheet_s.write(control + 7 + 1, 0, 'Totales', header)
    worksheet_s.write(control + 7 + 1, 1, '', header)
    worksheet_s.write(control + 7 + 1, 2, cant_tot, header)
    worksheet_s.write(control + 7 + 1, 3, '', header)
    worksheet_s.write(control + 7 + 1, 4, total, header)
    worksheet_s.write(control + 7 + 1, 5, '100%', header)

    worksheet_s.set_column('B:B', 25)
    worksheet_s.set_column('C:C', 7)
    worksheet_s.set_column('D:D', 15)
    worksheet_s.set_column('E:E', 15)
    worksheet_s.set_column('G:G', 15)
    worksheet_s.set_column('H:H', 15)

    workbook.close()
    xlsx_data = output.getvalue()
    # xlsx_data contains the Excel file
    return xlsx_data