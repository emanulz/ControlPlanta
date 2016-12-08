from django.db import models

# Create your models here.
from inventarios.models import EntradasInventario, SalidasInventario


class Reproceso(models.Model):
    entrada=models.ManyToManyField(EntradasInventario,verbose_name='Entrada de inventario relacionada')
    salida=models.ManyToManyField(SalidasInventario,verbose_name='Entrada de inventario relacionada')
    cortesusados=models.PositiveIntegerField(default=1,verbose_name='Cantidad de cortes Usados')
    cortesusadoskg=models.FloatField(default=1,verbose_name='Cantidad de cortes Usados Kg')
    prodcreados=models.PositiveIntegerField(default=1,verbose_name='Cantidad de productos creados')
    prodcreadoskg=models.FloatField(default=1,verbose_name='Cantidad de productos creados Kg')
    notas = models.CharField(max_length=255, blank=True, null=True, verbose_name='Notas')

    def __unicode__(self):
        ret = str(self.id)
        return ret
    class Meta:
        ordering=['id']
        verbose_name='Reproceso'
        verbose_name_plural='1. Reprocesos'
