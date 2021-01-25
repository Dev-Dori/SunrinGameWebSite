from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import loader
import json
import requests

def lobby(request):
    return render(request, 'chat/lobby.html', {})

def sketch(request):
    return render(request, 'chat/sketch.html', {})

def ketu(request):
    if request.method == "GET":
        return render(request, 'chat/ketu.html', {})

def ajaxproject(request):
    template = loader.get_template('chat/test6.html')
    context = {'latest_question_list': "5tte"} 
    return HttpResponse(template.render(context,request))

def searchData(request):
    data = request.POST.get('msg')
    context = {'msg': data,}
    return HttpResponse(json.dumps(context), "application/json")

def main(request):
    return redirect('http://127.0.0.1:8000/lobby')
