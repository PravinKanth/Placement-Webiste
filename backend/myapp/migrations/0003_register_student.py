# Generated by Django 4.2.2 on 2023-07-22 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_register_coordinator'),
    ]

    operations = [
        migrations.CreateModel(
            name='Register_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('studentname', models.CharField(max_length=100)),
                ('studentmailid', models.CharField(max_length=100)),
                ('studentpassword', models.CharField(max_length=100)),
            ],
        ),
    ]
