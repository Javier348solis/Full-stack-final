from django.urls import path,include
from .views import InicioSesionView, ProductoView, StockView
from .views import RegistrarUsuarioView, DatosComprasView

urlpatterns = [
    path("registro-usuario/", RegistrarUsuarioView.as_view(), name=""),
    path('login-usuario/',InicioSesionView.as_view(), name='login_usuario'),
    path("crear-producto",ProductoView.as_view()),
    path("stock-productos", StockView.as_view()),
    path("datos-compras", DatosComprasView.as_view())
]

