const community = {
    data: [],
    image: []
};

const userId = document.cookie.substr(7,);
const b_id = location.search.substr(location.search.indexOf("=") + 1);

function imgDelete(i_id) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("DELETE", url + `/board/${i_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send();
    image();
}

function imgInsert() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const img = document.getElementById("files");

    let files = img;
    let formData = new FormData();

    formData.append('Files', files.files[0]);

    xhttp.open("POST", url + `/board/upload/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

function communityModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const files = document.getElementById("files").value;
    if (confirm("게시글을 수정합니다.")) {
        if (document.getElementById("type").value.trim().length <= 0) {
            alert("타입을 선택해주세요.");
            document.getElementById("type").focus();
            return false;
        } else if (document.getElementById("title").value.trim().length <= 0) {
            alert("제목을 작성해주세요.");
            document.getElementById("title").focus();
            return false;
        } else if (document.getElementById("content").value.trim().length <= 0) {
            alert("내용을 작성해주세요.");
            document.getElementById("content").focus();
            return false;
        } else if (document.getElementById("title").value.length > 20) {
            alert("글자 제한 수를 초과하였습니다.");
            document.getElementById("title").focus();
            return false;
        } else if (document.getElementById("content").value.length > 200) {
            alert("글자 제한 수를 초과하였습니다.");
            document.getElementById("content").focus();
            return false;
        }
        const modifyData = {
            userId: userId,
            b_id: b_id,
            b_type: document.getElementById("type").value,
            b_title: document.getElementById("title").value,
            b_content: document.getElementById("content").value
        };

        xhttp.open("PUT", url + `/board/community/${b_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(modifyData));

        if (files !== "") {
            imgInsert();
        }

        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function cancel() {
    if (confirm("수정을 취소하겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function image() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    let real_delBtn = document.getElementById("delBtn");
    real_delBtn.innerHTML = "";

    xhttp.open("GET", url + `/board/getImage/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        community.image = JSON.parse(xhttp.response);
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    if (community.image.length > 0) {
        for (let index of community.image) {
            real_delBtn.innerHTML +=
                `${index.fileName}<img src="../static/delete.png" alt="delIcon" style="width: 20px; height: 20px;" onclick="imgDelete(${index.i_id})" />`;
        }
    }

}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        community.data = array;
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    image();

    document.getElementById("title").value = community.data.b_title;
    document.getElementById("content").value = community.data.b_content;
    document.getElementById("type").value = community.data.b_type;
})();