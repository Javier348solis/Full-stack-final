from django.urls import path,include
from .views import InicioSesionView, ProductoView
from .views import RegistrarUsuarioView

urlpatterns = [
    path("registro-usuario/", RegistrarUsuarioView.as_view(), name=""),
    path('login-usuario/',InicioSesionView.as_view(), name='login_usuario'),
    path("crear-producto",ProductoView.as_view())
]

