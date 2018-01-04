# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rsa', '0002_booklist'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersBook',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('user_pk', models.IntegerField()),
                ('book_pk', models.IntegerField()),
                ('book_key', models.TextField()),
                ('book_content', models.TextField()),
            ],
        ),
    ]
