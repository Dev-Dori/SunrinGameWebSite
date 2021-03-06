






// ################################################################# ajax django 처리 부분 ######################################################

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$(document).ready(function () {
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});


// ################################################################# 단어입력 서버와의 ajax 통신 ##################################################
function msg() {
    if(document.getElementById("msg").value.length >= 2){
        user_word();
        p_time+=100;
        document.getElementById("msg").readOnly = true;
        $.ajax({
            url: "searchData/",
            dataType: 'json',
            type: 'POST',
            data: { 'msg': user_msg }, //$('#msg').val()
            success: function (result) {
                last_word(result['msg']);
                document.getElementById("msg").readOnly = false;
            }
        });
    }
}

// ################################################################# ajax django 처리 부분 끝######################################################


// ################################################################# 봇, 유저 단어 추가 부분 #######################################################

function bot_word(msg,color){ // 봇이 입력한 단어를 추가해 주는 부분
    document.getElementById("msg").value =""; 
    var word_list = document.getElementById("word_list");
    var tmp = document.createElement("div");
    var size = msg.length*30+54+"px " +"92px";
    tmp.setAttribute("class", "word b_word");
    //tmp.style.backgroundColor=color;
    tmp.style.backgroundSize = size;
    tmp.innerHTML = msg;
    word_list.prepend(tmp);
    document.getElementById("B_sco").innerHTML = bot_score;
    document.getElementById("P_sco").innerHTML = user_score;
}

function user_word(){   // 플레이어가 입력한 단어를 추가해주는 부분
    user_msg = document.getElementById("msg").value;
    document.getElementById("msg").value ="";
    var word_list = document.getElementById("word_list");
    var size = user_msg.length*30+54+"px " +"92px";
    var tmp = document.createElement("div");
    tmp.setAttribute("class", "word u_word");
    tmp.style.backgroundSize = size;
    
    tmp.innerHTML = user_msg;
    word_list.prepend(tmp);
}

function last_word(msg){
    if(msg.slice(-1)[0] == "1"){ //당신의 승리
        msg = msg.replace("1",""); 
        bot_word(msg,"blue");
        document.getElementById("f_msg").innerText = msg.slice(-1)[0];
        p_time-=100;
    }else if(msg.slice(-1)[0] == "2"){  //이미 사용한 단어
        msg = msg.replace("2","");
        bot_word(msg,"red");
        p_time-=100;
    }else if(msg.slice(-1)[0] == "3"){ //첫 단어 이상
        msg = msg.replace("3","");
        bot_word(msg,"green");
        p_time-=100;
    }else if(msg.slice(-1)[0] == "4"){  // 한글자 일때
        msg = msg.replace("4","");
        bot_word(msg,"orange");
        p_time-=100;
    }else if(msg.slice(-1)[0] == "5"){  // 단어가 없을때
        msg = msg.replace("5","");
        bot_word(msg,"orange");
        p_time-=100;
    }else{  //평상시
        p_time = 100;
        user_score += 10+user_msg.length;
        bot_score += 10+msg.length;
        bot_word(msg,"grey");
        document.getElementById("f_msg").innerText = msg.slice(-1)[0];
    }
}


// ################################################################# 봇, 유저 단어 추가 부분 끝 #########################################################


// ################## 팝업창 ################# \\

function imagePopup(type) {
    if(type == 'open') {
        // 팝업창을 연다.
        jQuery('#layer').attr('style','display:inline');
        // 페이지를 가리기위한 레이어 영역의 높이를 페이지 전체의 높이와 같게 한다.
        jQuery('#layer').height(jQuery(document).height());
    }
    else if(type == 'close') {
        // 팝업창을 닫는다.
        jQuery('#layer').attr('style','display:none');
        gameTime();
        document.getElementById("msg").readOnly = false;
        document.getElementById("msg").autofocus = true;
    }
}


// ################## 타이머 ################# \\




function gameTime() { // 40짜리
    timerGId = setInterval("timeG()", 0.01); // 1000 = 1초 //  10 =0.01 // 
}

function timeG(){
    g_time-=0.01;
    //g_time -= 1;
    var a = document.getElementById("timer_bar");
    a.style.width = g_time + "%";


    p_time-=0.08;
    var p = document.getElementById("userTime_bar");
    p.style.width = p_time + "%";
    if(p_time < 0){
        clearInterval(timerGId);
        gameEnd("-1")  // 입력시간 초과
    } 

    if(g_time<0){ 
        clearInterval(timerGId);
        gameEnd(1) // 게임시간 끝
    }

}

// ################## 게임 끝 ################# \\

