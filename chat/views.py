from django.shortcuts import render

from django.http import HttpResponse
import json
import requests

def lobby(request):
    return render(request, 'chat/lobby.html', {})

def sketch(request):
    return render(request, 'chat/sketch.html', {})

def ketu(request):
    if request.method == "GET":
        return render(request, 'chat/ketu.html', {})

def word(request):
    print(request)
    return render(request, 'chat/ketu.html', {}) 
