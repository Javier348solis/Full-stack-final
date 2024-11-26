from django.urls import path,include
from .views import InicioSesionView, ProductoView, RegistrarAdminView, StockView
from .views import RegistrarUsuarioView, DatosComprasView,ProductoUpdate

urlpatterns = [
    path("registro-usuario/", RegistrarUsuarioView.as_view(), name=""),
    path("registro-admin/", RegistrarAdminView.as_view(), name=""),
    path('login-usuario/',InicioSesionView.as_view(), name='login_usuario'),
    path("crear-producto",ProductoView.as_view()),
    path("stock-productos", StockView.as_view()),
    path("datos-compras", DatosComprasView.as_view()),
    path('productos/update/<int:uniqueId>/', ProductoUpdate.as_view(), name='update_producto'),
]

