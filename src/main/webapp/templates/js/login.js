function login(userId, userPw) {
    let xhttp = new XMLHttpRequest();
    const URL = "http://3.133.28.138:8080";

    let DATA = {
        userId: userId.value,
        userPw: userPw.value,
    };

    xhttp.open("POST", URL + `/member/login`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("아이디 또는 비밀번호가 틀렸거나, 해당 아이디가 존재하지 않습니다.");
        } else {
            location.href = "index.html";
        }
    };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(DATA));
}

function loginCheck() {
    const USER_ID = document.getElementById("userId"),
        USER_PW = document.getElementById("userPw");

    if (USER_ID.value.trim().length <= 0) {
        alert("아이디을 입력해주세요.");
        USER_ID.focus();
        return false;
    } else if (USER_PW.value.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        USER_PW.focus();
        return false;
    }

    login(USER_ID, USER_PW);
}


function enter() {
    if (window.event.keyCode === 13) {
        loginCheck();
    }
}