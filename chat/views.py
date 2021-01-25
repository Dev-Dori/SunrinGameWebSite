from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import loader
import csv
import os
import json
import requests
import random




def lobby(request):
    return render(request, 'chat/lobby.html', {})

def sketch(request):
    return render(request, 'chat/sketch.html', {})

def ketu(request):

    ############## csv 단어리스트 불러오기 ##############
    global BASE
    global korean
    global reader
    global result
    
    BASE = os.path.dirname(os.path.abspath(__file__))
    korean = open(os.path.join(BASE,"korean.csv"), 'r',  encoding="utf-8")
    reader = csv.reader(korean)

    result = []
    for line in reader:
        result.append(line)

    ############## csv 단어리스트 불러오기  끝##############
    korean.close()

    if request.method == "GET":
        return render(request, 'chat/ketu.html', {})

def ajaxproject(request):
    template = loader.get_template('chat/test6.html')
    context = {'latest_question_list': "5tte"} 
    return HttpResponse(template.render(context,request))

def searchData(request):

    data = request.POST.get('msg')
    context = {'msg': data,}
    
    print(data[-1])
    if wordCheck(data):
        res = get_words(data[-1])
        res = res[random.randrange(0,len(res))]
        context = {'msg': res,}
    else :
        context = {'msg': "그런 단어는 없다 애송이",}
    
    return HttpResponse(json.dumps(context), "application/json")

def main(request):
    return redirect('http://127.0.0.1:8000/lobby')


def get_words(start):
    text_list = []
    for i in result:
        if i[0].startswith(start) and not i[0].endswith('다'):
            if "-" in i[0] or "^" in i[0] or " " in i[0]:
                continue
            text = i[0]
            if len(text) >= 2:
                text_list.append(text.replace("",""))
    text_list = list(set(text_list))
    text_list.sort(key=lambda item: (len(item),item), reverse=True)
    return text_list

def wordCheck(word):
    wordCheck = 0
    for re1  in result:
        if word in re1:
            return True
    return False
