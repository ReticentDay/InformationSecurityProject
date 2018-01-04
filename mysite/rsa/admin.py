from django.contrib import admin
# Register your models here.
from .models import Users, BookList, UsersBook

admin.site.register(Users)
admin.site.register(BookList)
admin.site.register(UsersBook)