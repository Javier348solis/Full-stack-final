from rest_framework.serializers import ModelSerializer
from .models import Productos

class ProductosSerializer(ModelSerializer):
    class Meta:
        model = Productos
        fields = "__all__"