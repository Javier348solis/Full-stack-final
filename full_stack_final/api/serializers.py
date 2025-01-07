from rest_framework.serializers import ModelSerializer
from .models import Productos
from .models import StockProductos
from .models import DatosCompras
from rest_framework import serializers

class ProductosSerializer(ModelSerializer):
    class Meta:
        model = Productos
        fields = "__all__"
        
class StockProductosSerializer(ModelSerializer):
    class Meta:
        model  = StockProductos
        fields = "__all__"
        
class DatosComprasSerializer(ModelSerializer):
    class Meta:
        model  = DatosCompras
        fields = "__all__"
        
class ModiProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = ['id', 'nombre_producto', 'descripcion', 'precio', 'cantidad_ml']