# Generated by Django 5.1.2 on 2024-11-19 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userregistro_telefono'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productos',
            name='freignKey',
        ),
    ]
