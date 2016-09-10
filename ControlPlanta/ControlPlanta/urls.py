"""ControlPlanta URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from api.views import LoteApiView
from cajeros.views import CajeroCreate
from canales.views import CanalViewSet, eliminarCanalView
from clientes.views import ClientViewSet
from cotizaciones.views import CotizacionViewSet, DetalleProductosCotiViewSet
from deshueses.views import DeshueseViewSet, DetalleDeshueseViewSet
from devoluciones.views import DevolucionesView, DevolucionViewSet, DetalleDevViewSet
from gastos.views import GastoViewSet, TipoGastoViewSet
from inventarios.views import InventarioTotalViewSet,InventarioResumenViewSet,InventarioEntradasViewSet,InventarioSalidasViewSet, \
    InventariosView, AlertasInventariosView
from inventariosMP.views import InventarioResumenMPViewSet, InventarioEntradasMPViewSet, InventarioSalidasMPViewSet, \
    InventariosmpView
from materiasPrimas.views import MateriaPrimaViewSet, FamiliaMPViewSet
from reportes.views import ReportesView
from reprocesos.views import ReprocesoViewSet, ReprocesosView
from variablesGlobales.views import VariableGlobalViewSet
from ventas.views import VentasView, DetallePagoViewSet, DetalleProductosViewSet, VentaViewSet, CierreView, \
    DevproformaView
from lotes.views import LoteCreate, LoteViewSet, eliminarLoteView
from frontend.views import LandingView, TrazabilidadView
from rest_framework import routers
from productos.views import ProductViewSet, FamiliaViewSet, SubFamiliaViewSet
from proveedores.views import ProveedorViewSet
from cajeros.views import CajeroViewSet
from cuentasCobrar.views import AbonosViewSet,DetalleCuentaViewSet, cuentasCobrarView, NotaDeCreditoViewSet, \
     recuperacionView, reporteCuentasCobrarView, saldosClienteView
from frontend.views import xls_report
# Routers provide an easy way of automatically determining the URL conf.

router = routers.DefaultRouter()
router.register(r'canales', CanalViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'productos', ProductViewSet)
router.register(r'familias', FamiliaViewSet)
router.register(r'subfamilias', SubFamiliaViewSet)
router.register(r'deshuese', DeshueseViewSet)
router.register(r'detalledeshuese', DetalleDeshueseViewSet)
router.register(r'lotes', LoteViewSet)
router.register(r'inventariototal', InventarioTotalViewSet)
router.register(r'clientes', ClientViewSet)
router.register(r'cajeros', CajeroViewSet)
router.register(r'inventarioresumen', InventarioResumenViewSet)
router.register(r'inventarioentrada', InventarioEntradasViewSet)
router.register(r'inventariosalida', InventarioSalidasViewSet)
router.register(r'inventarioresumenmp', InventarioResumenMPViewSet)
router.register(r'inventarioentradamp', InventarioEntradasMPViewSet)
router.register(r'inventariosalidamp', InventarioSalidasMPViewSet)
router.register(r'detallepago', DetallePagoViewSet)
router.register(r'detalleproducto', DetalleProductosViewSet)
router.register(r'venta', VentaViewSet)
router.register(r'abonoscobrar', AbonosViewSet)
router.register(r'saldocobrar', DetalleCuentaViewSet)
router.register(r'variableglobal', VariableGlobalViewSet)
router.register(r'materiaprima', MateriaPrimaViewSet)
router.register(r'familiamp', FamiliaMPViewSet)
router.register(r'reproceso', ReprocesoViewSet)
router.register(r'notacredito', NotaDeCreditoViewSet)
router.register(r'devolucion', DevolucionViewSet)
router.register(r'detalledevolucion', DetalleDevViewSet)
router.register(r'cotizacion', CotizacionViewSet)
router.register(r'detalleproductocotizacion', DetalleProductosCotiViewSet)
router.register(r'gasto', GastoViewSet)
router.register(r'tipogasto', TipoGastoViewSet)



urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^trazabilidad/', TrazabilidadView.as_view()),
    url(r'^ventas/', VentasView.as_view()),
    url(r'^cierrediario/', CierreView.as_view()),
    url(r'^inventarios/', InventariosView.as_view()),
    url(r'^alertas/', AlertasInventariosView.as_view()),
    url(r'^inventariosmp/', InventariosmpView.as_view()),
    url(r'^cuentascobrar/', cuentasCobrarView.as_view()),
    url(r'^reproceso/', ReprocesosView.as_view()),
    url(r'^recuperacion/', recuperacionView.as_view()),
    url(r'^reportecuentascobrar/', reporteCuentasCobrarView.as_view()),
    url(r'^estadocuenta/', saldosClienteView.as_view()),
    url(r'^eliminarcanal/', eliminarCanalView.as_view()),
    url(r'^eliminarlote/', eliminarLoteView.as_view()),
    url(r'^devoluciones/', DevolucionesView.as_view()),
    url(r'^devolvercotizacion/', DevproformaView.as_view()),
    url(r'^reportes/', ReportesView.as_view()),
    url(r'addcanal/', 'canales.views.canalform', name='canales'),
    url(r'addgasto/', 'gastos.views.gastoform', name='canales'),
    url(r'addlote/', 'lotes.views.loteform', name='lotes'),
    url(r'backupdb/', 'frontend.views.backupdbmine', name='backup'),
    url(r'adddeshuese/', 'deshueses.views.deshueseform', name='deshueses'),
    url(r'^getcanal/(?P<id>\d+)$', 'lotes.views.cargar_canal', name='cargar_canal'),
    url(r'^totallotes/', 'lotes.views.totallotes', name='totallotes'),
    url(r'^productoscerdo/', 'productos.views.ProdDeCerdo', name='productoscerdo'),
    url(r'^lotes/', LoteApiView,name='lotes'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'xlsreport/', xls_report, name='xls_report'),
    url(r'^', LandingView.as_view()),
]
