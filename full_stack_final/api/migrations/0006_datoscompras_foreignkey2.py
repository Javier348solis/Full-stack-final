# Generated by Django 5.1.2 on 2024-11-20 21:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_stockproductos_nombre_producto'),
    ]

    operations = [
        migrations.AddField(
            model_name='datoscompras',
            name='foreignKey2',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.productos'),
            preserve_default=False,
        ),
    ]