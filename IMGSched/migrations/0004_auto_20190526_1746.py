# Generated by Django 2.2.1 on 2019-05-26 12:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('IMGSched', '0003_auto_20190526_1744'),
    ]

    operations = [
        migrations.CreateModel(
            name='People',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admin_value', models.BooleanField(default=False)),
                ('enroll', models.IntegerField()),
                ('email', models.EmailField(max_length=100)),
                ('user_name', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='event',
            name='manager',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='IMGSched.People'),
        ),
    ]
