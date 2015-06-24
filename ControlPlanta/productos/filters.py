import django_filters
from .models import Producto

class ProductFilter(django_filters.FilterSet):
    description=django_filters.CharFilter(lookup_type='icontains')
    product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=Producto
        fields=('id','category','product_code','description')


