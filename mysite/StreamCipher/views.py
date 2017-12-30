from django.shortcuts import render

# Create your views here.

def RsaEncrypt(e, N, m):
    put = 1
    for i in range(1,e):
        put = ((put % N) * (m % N)) % N
    return put
