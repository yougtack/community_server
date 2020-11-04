const USER = {
    data: []
};

function profile() {
    let files = document.getElementById("profile");
    let formData = new FormData();
    formData.append('profile', files.files[0]);

    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("PUT", URL + `/member/signUpProfile`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

function signUp(userId, userPw) {
    let xhttp = new XMLHttpRequest();

    const URL = "http://localhost:8080";
    const DATA = {
        userId: userId.value,
        userPw: userPw.value
    };

    xhttp.open("POST", URL + `/member/signUp`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            alert("회원가입을 성공하셨습니다.");
            location.href = "login.html";
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(DATA));
}


function signUpCheck() {
    const USER_ID = document.getElementById("userId"),
        USER_PW = document.getElementById("userPw"),
        USER_PW_CHECK = document.getElementById("userPwCheck");

    const ID_PATTERN = /^.{4,10}$/;
    const PW_PATTERN = /^(?=.*[A-Z])(?=.*[!@#$%^&*+=-]).{4,10}$/;

    if (USER_ID.value.trim().length <= 0) {
        alert("아이디을 입력해주세요.");
        USER_ID.focus();
        return false;
    } else if (!ID_PATTERN.test(USER_ID.value)) {
        alert("아이디를 4자 이상 ~ 10자 이하로 입력해주세요.");
        USER_ID.focus();
        return false;
    }
    for (let index of USER.data) {
        if (index.userId === USER_ID.value) {
            alert("이미 존재하는 아이디입니다.");
            userId.focus();
            return false;
        }
    }
    if (USER_PW.value.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        USER_PW.focus();
        return false;
    } else if (!PW_PATTERN.test(USER_PW.value)) {
        alert("비밀번호 4 ~ 10 글자\n" +
            "대문자 1개 이상 포함 특수문자 1개 이상 포함시켜주세요.");
        USER_PW.focus();
        return false;
    } else if (USER_PW.value !== USER_PW_CHECK.value) {
        alert("비밀번호가 일치하지않습니다.");
        USER_PW.focus();
        return false;
    }

    signUp(USER_ID, USER_PW);
    profile();
}

function enter() {
    if (window.event.keyCode === 13) {
        signUpCheck();
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/member/memberList`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const ARRAY = JSON.parse(xhttp.responseText);

        for (let index of ARRAY) {
            USER.data = ARRAY;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
})();