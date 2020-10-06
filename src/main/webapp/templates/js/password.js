const userId = document.cookie.substr(7,);

function enter() {
    if (window.event.keyCode === 13) {
        passwordCheck();
    }
}

function passwordChange(user_password) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const passwordData = {
        userId: userId,
        userPw: user_password
    };

    xhttp.open("PUT", url + `/member`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(passwordData));

    alert("비밀번호가 변경되었습니다.");
    location.href = `index.html`;
}

function passwordCheck(){
    const user_password = document.getElementById("user_password").value;
    const user_password_check = document.getElementById("user_password_check").value;

    const pwPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*+=-]).{4,10}$/;
    if (user_password.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        user_password.focus();
        return false;
    } else if (!pwPattern.test(user_password)) {
        alert("비밀번호 4 ~ 10 글자\n" +
            "대문자 1개 이상 포함 특수문자 1개 이상 포함시켜주세요.");
        user_password.focus();
        return false;
    } else if (user_password !== user_password_check) {
        alert("비밀번호가 일치하지않습니다.");
        user_password_check.focus();
        return false;
    }

    passwordChange(user_password);
}