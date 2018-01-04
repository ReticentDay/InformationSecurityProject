from django.shortcuts import render,redirect
from django.http import HttpResponse
from rsa.models import Users,BookList,UsersBook
# Create your views here.
# please write the ras encryption in here

def add_user(request):
    if 'name' in request.POST:
        name = request.POST['name']
        public_key = request.POST['public_key']
        Users.objects.create(name = name , public_key = public_key)
        red = redirect('/bookList')
        red.set_cookie('name',name)
        return red

def login(request):
    if 'name' in request.POST:
        name = request.POST['name']
        red = redirect('/bookList')
        red.set_cookie('name',name)
        return red

def index(request):
    return render(request, 'index.html')

def bookList(request):
    if 'name' in request.COOKIES:
        name = request.COOKIES['name']
        try:
            user = Users.objects.get(name = name)
            book_lists = BookList.objects.all()
            return render(request, 'bookList.html', {
                'book_lists' : book_lists,
                'user' : user,
            })
        except:
            return redirect('/')
    else:
        return redirect('/')

def bookShow(request,pk):
    if 'name' in request.COOKIES:
        name = request.COOKIES['name']
        try:
            user = Users.objects.get(name = name)
            book_id = pk
            user_id = user.pk
            book = UsersBook.objects.filter(user_pk = user_id, book_pk = book_id)
            if book == null:
                book = BookList.objects.get(pk=book_id)
                #key = SDES.getKey()
                #bookContent = SDES.encryp(book.content,key)
                #key = rsa.encryp(user.public_key,key)
                #UsersBook.objects.create(user_pk = user_id, book_pk = book_id, book_key = key, book_content = bookContent)
                #book = UsersBook.objects.filter(user_pk = user_id, book_pk = book_id)
            return render(request, 'show.html', {
                "bookContent" : "",
            })
        except:
            return redirect('/')
    else:
        return redirect('/')