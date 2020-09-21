const community = {
    data: []
};

let xhttp = new XMLHttpRequest();
const url = "http://localhost:8080";

const c_id = location.search.substr(6, 1);
const b_id = location.search.substr(location.search.indexOf("b_id=") + 5);
const userId = document.cookie.substr(7,);

function commentModify() {
    if (confirm("댓글을 수정합니다.")) {
        if (document.getElementById("c_content").value.trim().length <= 0) {
            alert("댓글을 작성해주세요.");
            document.getElementById("c_content").focus();
            return false;
        }
        const modifyData = {
            c_id: c_id,
            c_content: document.getElementById("c_content").value,
            userId: userId
        };

        xhttp.open("PUT", url + `/comment`, false);

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
    location.href = `userCommunity.html?b_id=${b_id}`;
}

function commentValue() {
    let c_comment;

    for (let i = 0; i < community.data.comments.length; i++) {
        if (c_id == community.data.comments[i].c_id) {
            c_comment = community.data.comments[i].c_content;
        }
    }

    document.getElementById("c_content").value = c_comment;

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

    commentValue();

})();