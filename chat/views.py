from django.shortcuts import render

def lobby(request):
    return render(request, 'chat/lobby.html', {})

def sketch(request):
    return render(request, 'chat/sketch.html', {})

def ketu(request):
    return render(request, 'chat/ketu.html', {})
