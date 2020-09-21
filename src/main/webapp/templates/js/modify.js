const community = {
    data: []
};

let xhttp = new XMLHttpRequest();
const url = "http://localhost:8080";

const userId = document.cookie.substr(7,);
const b_id = location.search.substr(location.search.indexOf("=") + 1);

function communityModify() {
    if (confirm("게시글을 수정합니다.")) {
        if (document.getElementById("type").value.trim().length <= 0 ){
            alert("타입을 선택해주세요.");
            document.getElementById("type").focus();
            return false;
        } else if (document.getElementById("title").value.trim().length <= 0 ){
            alert("제목을 작성해주세요.");
            document.getElementById("title").focus();
            return false;
        } else if (document.getElementById("content").value.trim().length <= 0 ){
            alert("내용을 작성해주세요.");
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

        location.href = `userCommunity.html?b_id=${b_id}`;

    }
}

function cancel() {
    if (confirm("수정을 취소하겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

(function init() {

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        community.data = array;

    };

    xhttp.send();

    document.getElementById("title").value = community.data.b_title;
    document.getElementById("content").value = community.data.b_content;

})();