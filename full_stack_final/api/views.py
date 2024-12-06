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
from rest_framework.permissions import IsAuthenticated,BasePermission,AllowAny
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
            return Response({"success":"Usuario valido","token":str(token.access_token),},status=status.HTTP_200_OK)
        else:
            return Response({"error":"Usuario invalido",},status=status.HTTP_400_BAD_REQUEST)
            
            
class ProductoView(ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]  # Si no esta autenticado puede hacer get
        return [IsAuthenticated()]  # Requiere autenticación para POST (crear producto)

# Para otros métodos, usar permisos predeterminados
    
class StockView(ListCreateAPIView):
    queryset = StockProductos.objects.all()
    serializer_class = StockProductosSerializer
    
class DatosComprasView(ListCreateAPIView):
    queryset = DatosCompras.objects.all()
    serializer_class = DatosComprasSerializer
    
# def get_productos(request):
#     product = Productos.objects.all()
#     serializer = ModiProductosSerializer(product, many=True)
#     return Response(serializer.data)

# def add_productos(request):
#     if request.method == 'Post':
#         serializer = ModiProductosSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductoUpdate(UpdateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    lookup_field = 'uniqueId'
    
class ProductoDelete(DestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
    lookup_field = 'uniqueId'

# def update_product(request, pk):
#     try:
#         producto = Productos.objects.get(pk=pk)
#     except Productos.DoesNotExist:
#         return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
#     serializer = ModiProductosSerializer(producto, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )

# def delete_producto(request, pk):
#     try:
#         producto = Productos.objects.get(pk=pk)
#     except Productos.DoesNotExist:
#         return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
#     producto.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)