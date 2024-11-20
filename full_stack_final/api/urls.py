from django.urls import path,include
from .views import InicioSesionView
from .views import RegistrarUsuarioView

urlpatterns = [
    path("registro-usuario/", RegistrarUsuarioView.as_view(), name="")
]
