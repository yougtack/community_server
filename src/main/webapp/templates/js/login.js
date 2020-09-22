function login(userId, userPw) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    let c;
    let data = {
        userId: userId.value,
        userPw: userPw.value,
    };

    xhttp.open("POST", url + `/member/login`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("아이디 또는 비밀번호가 틀렸거나, 해당 아이디가 존재하지 않습니다.");
            c = false;
            return false;
        } else {
            c = true;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));

    if(c){
        location.href = "index.html";
    }
}

function loginCheck() {
    const userId = document.getElementById("userId"),
        userPw = document.getElementById("userPw");

    if (userId.value.trim().length <= 0) {
        alert("아이디을 입력해주세요.");
        userId.focus();
        return false;
    } else if (userPw.value.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        userPw.focus();
        return false;
    }

    login(userId, userPw);
}


function enter() {
    if (window.event.keyCode === 13) {
        loginCheck();
    }
}