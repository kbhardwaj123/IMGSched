# Generated by Django 2.2.1 on 2019-05-26 12:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('IMGSched', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='people',
            name='user_name',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
