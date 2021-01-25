






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
            bot_word(result['msg']);
        }
    });
}

// ################################################################# ajax django 처리 부분 끝######################################################


// ################################################################# 봇, 유저 단어 추가 부분 #######################################################

function bot_word(msg){
    document.getElementById("msg").value ="";
    var word_list = document.getElementById("word_list");
    var tmp = document.createElement("div");
    tmp.setAttribute("class", "word");
    tmp.style.textAlign="right";
    tmp.style.color="white";
    tmp.innerHTML = msg;
    word_list.appendChild(tmp);
}

function user_word(){
    var user_msg = document.getElementById("msg").value
    var word_list = document.getElementById("word_list");
    var tmp = document.createElement("div");
    tmp.setAttribute("class", "word");
    tmp.style.textAlign="left";
    tmp.style.color="white";
    tmp.innerHTML = user_msg;
    word_list.appendChild(tmp);
}


// ################################################################# 봇, 유저 단어 추가 부분 끝 #########################################################
