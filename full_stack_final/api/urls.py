from django.conf import settings
from django.urls import path,include
from .views import InicioSesionView, ProductoView, RegistrarAdminView, StockView
from .views import RegistrarUsuarioView, DatosComprasView,ProductoUpdate, ProductoDelete
from django.conf.urls.static import static

urlpatterns = [
    path("registro-usuario/", RegistrarUsuarioView.as_view(), name=""),
    path("registro-admin/", RegistrarAdminView.as_view(), name=""),
    path('login-usuario/',InicioSesionView.as_view(), name='login_usuario'),
    path("crear-producto/",ProductoView.as_view()),
    path("stock-productos", StockView.as_view()),
    path("datos-compras", DatosComprasView.as_view()),
    path('productos/update/<int:uniqueId>/', ProductoUpdate.as_view(), name='update_producto'),
    path('productos/delete/<int:uniqueId>/', ProductoDelete.as_view(), name='delete_producto'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

