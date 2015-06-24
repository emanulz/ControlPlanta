import django_filters
from .models import Cliente

class ClientFilter(django_filters.FilterSet):
    name=django_filters.CharFilter(lookup_type='icontains')
    last_name=django_filters.CharFilter(lookup_type='icontains')
    code=django_filters.CharFilter(lookup_type='icontains')

    class Meta:
        model=Cliente
        fields=('code','name','last_name','identification','credit','credit_limit','associated','associated_code')