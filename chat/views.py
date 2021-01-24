from django.shortcuts import render
from django.shortcuts import redirect
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

def main(request):
    return redirect('http://127.0.0.1:8000/lobby')
