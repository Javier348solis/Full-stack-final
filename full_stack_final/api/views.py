from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import ProductosSerializer
from .models import Productos, UserRegistro
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListCreateAPIView
# Create your views here.
class RegistrarUsuarioView(APIView):
    def post(self,request):
        nombre_usuario  = request.data.get("username")
        correo_usuario  = request.data.get("email")
        clave_usuario = request.data.get("password")
        telefono_usuario = request.data.get("phone_number")
        
        if User.objects.filter(username=nombre_usuario).exists():
            return Response({"error":"El usuario NO se pudo crear",},status=status.HTTP_400_BAD_REQUEST)
        else:
            nuevo_usuario = User.objects.create_user(username=nombre_usuario,email=correo_usuario,password=clave_usuario)
            UserRegistro.objects.create(user=nuevo_usuario,telefono=telefono_usuario)
            return Response({"success":"El usuario SÍ se pudo crear",},status=status.HTTP_201_CREATED)
            
         
        
class InicioSesionView(APIView):
    def post(self,request):       
        nombre_usuario  = request.data.get("username")
        clave_usuario = request.data.get("password")

        usuario = authenticate(request,username=nombre_usuario,password=clave_usuario)
        
        if usuario is not None:
            token = RefreshToken.for_user(usuario)
            return Response({"success":"Usuario valido","token":str(token.access_token),},status=status.HTTP_200_OK)
        else:
            return Response({"error":"Usuario invalido",},status=status.HTTP_400_BAD_REQUEST)
            
            
class ProductoView(ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer