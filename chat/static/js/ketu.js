






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
    tmp.setAttribute("class", "word b_word");
    tmp.style.backgroundColor=color;
    tmp.innerHTML = msg;
    word_list.prepend(tmp);

   
}

function user_word(){
    var user_msg = document.getElementById("msg").value
    var word_list = document.getElementById("word_list");
    var tmp = document.createElement("div");
    tmp.setAttribute("class", "word u_word");
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
    }else if(msg.slice(-1)[0] == "4"){  // 단어가 없을때
        msg = msg.replace("4","");
        bot_word(msg,"orange");
    }else{  //평상시
        bot_word(msg,"grey");
        document.getElementById("f_msg").innerText = msg.slice(-1)[0];
    }
}


// ################################################################# 봇, 유저 단어 추가 부분 끝 #########################################################
