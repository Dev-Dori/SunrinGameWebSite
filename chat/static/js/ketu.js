






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
    $.ajax({
        url: "searchData/",
        dataType: 'json',
        type: 'POST',
        data: { 'msg': $('#msg').val() },
        success: function (result) {
            user_word();
            last_word(result['msg']);
        }
    });
}

// ################################################################# ajax django 처리 부분 끝######################################################


// ################################################################# 봇, 유저 단어 추가 부분 #######################################################

function bot_word(msg,color){
    document.getElementById("msg").value ="";
    var word_list = document.getElementById("word_list");
    var tmp = document.createElement("div");
    var size = msg.length*15+70+"px " +"92px";
    tmp.setAttribute("class", "word b_word");
    //tmp.style.backgroundColor=color;
    tmp.style.backgroundSize = size;
    tmp.innerHTML = msg;
    word_list.prepend(tmp);

}

function user_word(){
    var user_msg = document.getElementById("msg").value;
    var word_list = document.getElementById("word_list");
    var size = user_msg.length*13+74+"px " +"92px";
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
    }else if(msg.slice(-1)[0] == "2"){  //이미 사용한 단어
        msg = msg.replace("2","");
        bot_word(msg,"red");
    }else if(msg.slice(-1)[0] == "3"){ //첫 단어 이상
        msg = msg.replace("3","");
        bot_word(msg,"green");
    }else if(msg.slice(-1)[0] == "4"){  // 한글자 일때
        msg = msg.replace("4","");
        bot_word(msg,"orange");
    }else if(msg.slice(-1)[0] == "5"){  // 단어가 없을때
        msg = msg.replace("5","");
        bot_word(msg,"orange");
    }else{  //평상시
        p_time = 0;
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
    g_time+=0.01;
    var a = document.getElementById("timer_bar");
    a.style.width = g_time + "%";


    p_time+=0.08;
    var p = document.getElementById("userTime_bar");
    p.style.width = p_time + "%";
    if(p_time > 100){
        alert("gameover");
        document.getElementById("msg").readOnly = true;
        clearInterval(timerGId);
    } 

    if(g_time>100){ 
        document.getElementById("msg").readOnly = true;
        clearInterval(timerGId);
    }

}

// ################## 스타트 ################# \\


