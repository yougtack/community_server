function login(userId,userPw) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    let data = {
        userId: userId.value,
        userPw: userPw.value,
    };

    xhttp.open("POST", url + `/member/login`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(data));

    location.href = "index.html";
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
    if(window.event.keyCode === 13){
        loginCheck();
    }
}