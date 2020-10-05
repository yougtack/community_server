let xhttp = new XMLHttpRequest();
const url = "http://localhost:8080";

function c_length() {
    let content_length = document.getElementById("content_length");
    content_length.innerText = document.getElementById("content").value.length + "/200";
}

function insert(type, title, content) {
    const data = {
        b_type: type.value,
        b_title: title.value,
        b_content: content.value,
        userId: document.cookie.substr(7,)
    };

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));

    location.href = `community.html?b_type=${data.b_type}`;
}

function imgInsert() {
    const img = document.getElementById("files");
    let files = img;
    let formData = new FormData();

    formData.append('Files',files.files[0]);

    xhttp.open("POST", url + `/board/upload`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

function valueCheck() {
    const title = document.getElementById("title"),
        type = document.getElementById("type"),
        content = document.getElementById("content"),
        files = document.getElementById("files").value;

    if (title.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        title.focus();
        return false;
    } else if (type.value.trim().length <= 0) {
        alert("타입을 선택해주세요.");
        type.focus();
        return false;
    } else if (content.value.trim().length <= 0) {
        alert("내용을 작성해주세요.");
        content.focus();
        return false;
    }

    insert(type, title, content);

    if (files !== "") {
        imgInsert();
    }
}

(function loginCheck(){
    c_length();
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
    }
})();