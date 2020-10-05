const user = {
    data: []
};

const img = document.getElementById("profile");

function signUp(userId, userPw) {
    let xhttp = new XMLHttpRequest();

    let files = img;
    let formData = new FormData();
    formData.append('profile', files.files[0]);

    const url = "http://localhost:8080";
    const data = {
        userId: userId.value,
        userPw: userPw.value,
        profile: files.files[0]
    };

    const profile = files.files[0];

    xhttp.open("POST", url + `/member/signUp`, false);

    xhttp.onreadystatechange = () => {
        console.log("hi");
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);
    console.log(data);
    console.log(JSON.stringify(data));
    // location.href = "login.html";
}


function signUpCheck() {
    const userId = document.getElementById("userId"),
        userPw = document.getElementById("userPw"),
        userPwCheck = document.getElementById("userPwCheck");

    const idPattern = /^.{4,10}$/;
    const pwPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*+=-]).{4,10}$/;

    if (userId.value.trim().length <= 0) {
        alert("아이디을 입력해주세요.");
        userId.focus();
        return false;
    } else if (!idPattern.test(userId.value)) {
        alert("아이디를 4자 이상 ~ 10자 이하로 입력해주세요.");
        userId.focus();
        return false;
    }
    for (let index of user.data) {
        if (index.userId === userId.value) {
            alert("이미 존재하는 아이디입니다.");
            userId.focus();
            return false;
        }
    }
    if (userPw.value.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        userPw.focus();
        return false;
    } else if (!pwPattern.test(userPw.value)) {
        alert("비밀번호 4 ~ 10 글자\n" +
            "대문자 1개 이상 포함 특수문자 1개 이상 포함시켜주세요.");
        userPw.focus();
        return false;
    } else if (userPw.value !== userPwCheck.value) {
        alert("비밀번호가 일치하지않습니다.");
        userPw.focus();
        return false;
    }

    signUp(userId, userPw);

    alert("회원가입을 성공하셨습니다.");
}

function enter() {
    if (window.event.keyCode === 13) {
        signUpCheck();
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/member/memberList`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            user.data = array;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
})();