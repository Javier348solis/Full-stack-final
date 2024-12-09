from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator

# class UserRegistro(models.Model):
#     uniqueID = models.AutoField(primary_key=True) #Esto incrementa como una llave primaria
#     foreignKey = models.ForeignKey('self', on_delete=models.SET_NULL=True, blank=True) #Esto lo que hace es que relaciona con otras tablas(Si fuera necesario)
#     nombre_completo = models.CharField(max_length=255)
#     contraseña = models.CharField(max_length=255)
#     correo_electronico = models.CharField(unique=True) #El unique sirve para evitar que los correos se dupliquen
    
#     def __str__(self):
#         return self.nombre_completo

class UserRegistro(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20,null=False,blank=False)
    
    def __str__(self):
        return self.user.username
    
class Productos(models.Model):
    uniqueId = models.AutoField(primary_key=True)
    # freignKey = models.ForeignKey(DatosCompras, on_delete=models.CASCADE) #Esta se relaciona con los dato de compras
    nombre_producto = models.CharField(max_length=255)
    cantidad_ml = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    marca= models. CharField(max_length=255)
    imagen= models.TextField()
    genero = models.CharField(
        max_length=10, choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer')],default='Hombre',
    )

    
    
    def __str__(self): 
        return self.nombre_producto

class DatosCompras(models.Model):
    uniqueId = models.AutoField(primary_key=True) 
    DatosPerfu = models.ForeignKey(UserRegistro, on_delete=models.CASCADE) 
    DatosProductos = models.ForeignKey(Productos, on_delete=models.CASCADE)#El objetivo es que haga relacion con UserRegisytro
    nombre_producto = models.CharField(max_length=255)
    cantidad_botellas = models.IntegerField()
    precio_total = models.DecimalField(max_digits=10, decimal_places=4)
    fecha_de_compra = models.DateTimeField(auto_now_add=True)
    #colocar relación de usuario    
    def __str__(self):
        return f'{self.nombre_cliente} - {self.nombre_producto}'
    
    
class StockProductos(models.Model):
    iniqueId = models.AutoField(primary_key=True)
    Stock = models.ForeignKey(Productos, on_delete=models.CASCADE)
    cantidad_disponible = models.IntegerField()
   
  
    def __str__(self):
        return f'{self.nombre_producto} - {self.cantidad_disponible} disponibles'
    
# construir un nvo modelo Carrito con la relacion al usuario que esta comprando, una relacion multiple al producto, una fecha de compra Y el total
class Carrito(models.Model):
    productos = models.ManyToManyField(Productos,related_name='relacion_productos')
    nombre_producto = models.CharField(max_length=255)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(UserRegistro,on_delete=models.CASCADE)


