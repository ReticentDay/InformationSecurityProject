from django.db import models

# Create your models here.

class Users(models.Model):
    name = models.CharField(max_length = 20, unique=True)
    public_key = models.TextField()
    def __str__(self):
        return self.name

class BookList(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    def __str__(self):
        return self.title

class UsersBook(models.Model):
    user_pk = models.IntegerField()
    book_pk = models.IntegerField()
    book_key = models.TextField()
    book_content = models.TextField()
