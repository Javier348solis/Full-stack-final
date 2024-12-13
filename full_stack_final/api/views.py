from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import ProductosSerializer, StockProductosSerializer, DatosComprasSerializer
from .models import Productos, UserRegistro, StockProductos, DatosCompras
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListCreateAPIView,UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated,BasePermission,AllowAny,IsAdminUser 
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
            token = RefreshToken.for_user(nuevo_usuario)
            UserRegistro.objects.create(user=nuevo_usuario,telefono=telefono_usuario)
            return Response({"success":"El usuario SÍ se pudo crear",'token_acceso:':str(token.access_token)},status=status.HTTP_201_CREATED)

class RegistrarAdminView(APIView):
    def post(self,request):
        nombre_usuario  = request.data.get("username")
        clave_usuario = request.data.get("password")
        
        if User.objects.filter(username=nombre_usuario).exists():
            return Response({"error":"El usuario NO se pudo crear",},status=status.HTTP_400_BAD_REQUEST)
        else:
            nuevo_usuario = User.objects.create_superuser(username=nombre_usuario,password=clave_usuario)
            return Response({"success":"El usuario SÍ se pudo crear",},status=status.HTTP_201_CREATED)
         
        
class InicioSesionView(APIView):
    def post(self,request):       
        nombre_usuario  = request.data.get("username")
        clave_usuario = request.data.get("password")

        usuario = authenticate(request,username=nombre_usuario,password=clave_usuario)
        
        if usuario is not None:
            token = RefreshToken.for_user(usuario)
            return Response({"success":"Usuario valido",
                             "token":str(token.access_token),
                             'is_admin':usuario.is_superuser
                             },status=status.HTTP_200_OK)
        else:
            return Response({"error":"Usuario invalido",},status=status.HTTP_400_BAD_REQUEST)
        
        
class ProductoView(ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]  # Permitir GET sin autenticación
        return [IsAdminUser()]  # Requerir ser superusuario para POST

    def get_queryset(self):
        queryset = super().get_queryset()
        genero = self.request.query_params.get('genero')  # Obtener el filtro 'genero' de la URL
        if genero:
            queryset = queryset.filter(genero=genero)  # Filtrar por género si está presente
        return queryset


# Para otros métodos, usar permisos predeterminados    
class StockView(ListCreateAPIView):
    queryset = StockProductos.objects.all()
    serializer_class = StockProductosSerializer
    
class DatosComprasView(ListCreateAPIView):
    queryset = DatosCompras.objects.all()
    serializer_class = DatosComprasSerializer

class ProductoUpdate(UpdateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    lookup_field = 'uniqueId'

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'PUT' or self.request.method == 'PATCH': 
            return [IsAdminUser()]  
    
    
class ProductoDelete(DestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    lookup_field = 'uniqueId'

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]  # Si no esta autenticado puede hacer get