# Generated by Django 5.1.2 on 2024-12-08 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_productos_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='productos',
            name='genero',
            field=models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer')], default='Hombre', max_length=10),
        ),
        migrations.AlterField(
            model_name='productos',
            name='imagen',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
