const boardComment = {
    data: []
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);

function typeReadonly() {
    document.getElementById("type").value = boardComment.data.b_type;
}

function boardCommentInsert() {
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
}

function cancel() {
    if(confirm("답글 작성을 취소하시겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
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

        boardComment.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();

    document.getElementById("type").value = boardComment.data.b_type;
    document.getElementById("title").value = boardComment.data.b_title;
})();