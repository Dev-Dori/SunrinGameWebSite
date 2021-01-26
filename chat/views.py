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

    ############## 한글 단어리스트 불러오기 그리고 설정 ###################
    global BASE
    global korean
    global reader
    global result
    global usingword
    global lastword

    
    BASE = os.path.dirname(os.path.abspath(__file__))
    result = open(os.path.join(BASE,'ketu.txt'), 'r').read().split('\n')


    ###########/* 게임 초반 세팅 *\#########################  ( 첫 단어 선정 )
    a = get_words("기")
    lastword = a[random.randrange(0,len(a))][-1]
    usingword = []
    usingword.append(lastword)
    ###########/* 게임 초반 세팅 *\######################### 



    ############## 한글단어 단어리스트 불러오기  끝##############
        
    if request.method == "GET":
        return render(request, 'chat/ketu.html', {'first_word': lastword})


        

def ajaxproject(request):
    template = loader.get_template('chat/test6.html')
    context = {'latest_question_list': "5tte"} 
    return HttpResponse(template.render(context,request))

def searchData(request):

    data = request.POST.get('msg')
    context = {'msg': data,}

    global lastword
    
    print(data[-1])
    if wordCheck(data): #중복체크 사용된 단어 #단어 존재 여부 #끝말과 이어지는지
        if lastword[-1] == data[0]:
            if data not in usingword:
                usingword.append(data)
                res = get_words(data[-1])
                res = res[random.randrange(0,len(res))]
                if res not in usingword:
                    usingword.append(res)
                    lastword = res[-1]
                    context = {'msg': res,}
                else :
                    context = {'msg': "당신의 승리입니다.",}
            else:
                context = {'msg': "첫 단어가 틀립니다.",}
        else:
            context = {'msg': "첫 단어가 틀립니다.",}
    else :
        context = {'msg': "단어가 존재하지 않습니다.",}
    
    return HttpResponse(json.dumps(context), "application/json")

def main(request):
    return redirect('http://127.0.0.1:8000/lobby')


def get_words(start):
    text_list = []
    for i in result:
        if i.startswith(start) and not i.endswith('다'):
            if "-" in i or "^" in i or " " in i:
                continue
            text = i
            if len(text) >= 2:
                text_list.append(text.replace("",""))
    text_list = list(set(text_list))
    text_list.sort(key=lambda item: (len(item),item), reverse=True)
    return text_list

def wordCheck(word):
    for rel in result:
        if word in rel:
            return True
    return False
