from django.http import Http404
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import LoteSerializer
from lotes.models import Lote


class ApiLoteView(APIView):
    serializer_class=LoteSerializer
    queryset=Lote.objects.all()


    def get(self,request,id=None,format=None):

        lotes=Lote.objects.all()
        response = self.serializer_class(lotes,many=True)
        return Response(response.data)
    def post(self, request, format=None):
        lote=self.serializer_class(data=request.DATA)
        ret=request.DATA
        if lote.is_valid():
            lote.save()
            return Response(lote.data)
        else:
            return Response(lote.errors)



LoteApiView = ApiLoteView.as_view()


