function insert(title, content) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    let check;
    const data = {
        b_type: location.search.substr(location.search.indexOf("=") + 1),
        b_title: title.value,
        b_content: content.value,
        userId: document.cookie.substr(7,)
    };

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            check = false;
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            return false;
        } else {
            check = true;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));

    if (check) {
        location.href = `community.html?b_type=${data.b_type}`;
    }
}

function imgInsert() {
    const img = document.getElementById("files");
    let files = img;
    let formData = new FormData();

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    for (let value of files.files){
        formData.append('Files', value);
    }

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
        content = document.getElementById("content"),
        files = document.getElementById("files").value;

    if (title.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        title.focus();
        return false;
    } else if (content.value.trim().length <= 0) {
        alert("내용을 작성해주세요.");
        content.focus();
        return false;
    } else if (document.getElementById("title").value.length > 20) {
        alert("글자 제한 수를 초과하였습니다.");
        title.focus();
        return false;
    } else if (document.getElementById("content").value.length > 200) {
        alert("글자 제한 수를 초과하였습니다.");
        content.focus();
        return false;
    }

    insert(title, content);

    if (files !== "") {
        imgInsert();
    }
}

(function loginCheck() {
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return false;
    }
})();