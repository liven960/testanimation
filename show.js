let height = 0;
$(document).ready(function () {
    get_answers();
});

function get_answers() {
//     $.ajax({
//         type: "GET",
//         url: "/show/answers",
//         data: {},
//         success: function (response) {
//             let answers = response['all_answers']
//             for (let i = 0; i < answers.length; i++) {
//                 let answer = answers[i]['text_origin']
//                 let temp_html = ` <div class="show-answer">${answer}</div>`
//                 $('#box-answers').append(temp_html);
//             }
//             $('#box-answers').append(`<div class="show-answer">&nbsp</div>`);
//         }
//     })
    setTimeout( () => {
        get_height();
    }, 500);
}

let intervalId;
function get_height() {
    let n = 0;
    $('.show-answer').each(function (index, value) {
        height += Number($(this).css('height').slice(0, -2));
        console.log('height: ', height);
        n += 1;
        // console.log(n);
        // console.log('index: ', index);
        // console.log('value: ', value);
    })
    // let body_height = Number($('body').css('height').slice(0, -2));
    height += 100;
    console.log(height);

    setTimeout(() => {
        intervalId = setInterval(go_animate, 5);
    }, 500);
}

let animation_speed = 1.2;
let slow_speed = 1.2;
let fast_speed = 4;
let start = 1; //시작 여부 가늠
let up_go = 0; //윗쪽 방향키를 누르고 있는가
let down_go = 0; //조작이 없는지 확인용
let animate_stopped = 0; //animate 끝났는지 확인용

$(document).keydown(function down(key){ //enter를 누를시
    if (key.keyCode == 13) { //Down
        console.log($('#slow').val());
        if ($('#fast').val() != ''){
            fast_speed = Number($('#fast').val());
            console.log(fast_speed);
        }
        if ($('#slow').val() != ''){
            slow_speed = Number($('#slow').val());
            console.log(slow_speed);
        }
        let test = `<div className="end show_num">2. 현재 기본 속도: ${slow_speed} <br> 2. 방향키 속도: ${fast_speed}</div>`
        $('.show_num').empty();
        $('.show_num').append(test);

    }
})

function go_animate() {
    let margin_top = Number($('#box-answers').css('margin-top').slice(0, -2));
    if (start == 0){
        if (margin_top >= 0){
            if (up_go == 1){
                animation_speed = 0;
            } else {
                animation_speed = slow_speed;
            }
        }
    }

    if (animate_stopped == 1){ //만약 종료했으면
        if (down_go == 1 || up_go == 1){ //key를 눌렀을 때만 작동
            margin_top -= animation_speed;
        }
    } else {
        margin_top -= animation_speed;
    }

    start = 0; //처음 시작이 아님 (처음 시작에는 무조건 margin_top >= 0이 됨으로 예외처리 해줌)

    $('#box-answers').css('margin-top', `${margin_top}px`);

    if (-margin_top > height){
        stop_animate();
    }
}

function stop_animate() {
    animate_stopped = 1;
}

$(document).keydown(function down_and_up(key){ //방향키를 누르고 있을 때
    if (key.keyCode == 40 || key.keyCode == 34 || key.keyCode == 83){ //Down
        animation_speed = fast_speed;
        down_go = 1;
    } else if (key.keyCode == 38 || key.keyCode == 33 || key.keyCode == 87){ //Up
        animation_speed = -fast_speed;
        up_go = 1;
    }
})

$(document).keyup(function down_and_up(key){ //방향키에서 손을 뗐을 때
    // console.log(key.keyCode);
    if (key.keyCode == 40 || key.keyCode == 34 || key.keyCode == 83){ //Down
        animation_speed = slow_speed;
        down_go = 0;
    } else if (key.keyCode == 38 || key.keyCode == 33 || key.keyCode == 87){ //Up
        animation_speed = slow_speed;
        up_go = 0;
    }
})

let checkendId;
// checkendId = setInterval(check_end, 500);
let time = 0;

function check_end() {
    if (up_go == 0 && down_go == 0 && animate_stopped == 1){
        time += 0.5;
    } else {
        time = 0;
    }
    // console.log('time: ', time);
    // if (time == 5){
    //     clearInterval(intervalId);
    //     intervalId = null;
    //     clearInterval(checkendId);
    //     checkendId = null;
    //     window.location.href = './';
    // }
}

$('#answer-again').on("click", function go_to_question() {
    // window.location.href = './question';
})

$('#end').on("click", function go_to_main() {
    // window.location.href = './';
})


