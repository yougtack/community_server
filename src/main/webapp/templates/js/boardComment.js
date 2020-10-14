const boardComment = {
    data: []
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);

function typeReadonly() {
    document.getElementById("type").value = boardComment.data.b_type;
}

function boardCommentInsert(type,title,content) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    let check;
    let boardCommentData;

    if (boardComment.data.b_recomment_id === 0) {
         boardCommentData = {
            b_recomment_id: b_id,
            b_type: type.value,
            b_title: title.value,
            b_content: content.value,
            userId: document.cookie.substr(7,)
        }
    } else {
        boardCommentData = {
            b_recomment_id: boardComment.data.b_recomment_id,
            b_type: type.value,
            b_title: title.value,
            b_content: content.value,
            userId: document.cookie.substr(7,)
        }
    }

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            check = false;
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            return false;
        } else {
            check = true;
        }
        boardComment.data = JSON.parse(xhttp.responseText);
    };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(boardCommentData));

    if (check) {
        location.href = `community.html?b_type=${boardCommentData.b_type}`;
    }
}

function cancel() {
    if(confirm("답글 작성을 취소하시겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function valueCheck() {
    const title = document.getElementById("title"),
        content = document.getElementById("content"),
        type = document.getElementById("type");

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
    } else if (document.getElementById("title").value.length > 20) {
        alert("글자 제한 수를 초과하였습니다.");
        title.focus();
        return false;
    } else if (document.getElementById("content").value.length > 200) {
        alert("글자 제한 수를 초과하였습니다.");
        content.focus();
        return false;
    }

    boardCommentInsert(type, title, content);
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        boardComment.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();

    console.log(boardComment.data);

    document.getElementById("type").value = boardComment.data.b_type;
    document.getElementById("title").value = boardComment.data.b_title;
})();