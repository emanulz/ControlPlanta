import django_filters
from .models import Venta

class VentaFilter(django_filters.FilterSet):
    min_date=django_filters.DateFilter(name='date',lookup_type='gte')
    max_date=django_filters.DateFilter(name='date',lookup_type='lte')
    #product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=Venta
        fields=('id','client','nombrecliente','cashier','date','time','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos','datosdelpago','saldo','anulada','devuelto','connotacredito','conabono','min_date','max_date')

