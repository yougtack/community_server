const community = {
    data: []
};

const c_id = location.search.substr(6, 2).split("&");
const b_id = location.search.substr(location.search.indexOf("b_id=") + 5);
const userId = document.cookie.substr(7,);

function commentModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    if (confirm("댓글을 수정합니다.")) {
        if (document.getElementById("c_content").value.trim().length <= 0) {
            alert("댓글을 작성해주세요.");
            document.getElementById("c_content").focus();
            return false;
        } else if (document.getElementById("c_content").value.length > 50) {
            alert("글자 제한 수를 초과하였습니다.");
            document.getElementById("c_content").focus();
            return false;
        }
        const modifyData = {
            c_id: c_id[0],
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

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        community.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function commentValue() {
    let c_comment;

    for (let index of community.data.comments) {
        let value_id = "" + index.c_id;
        if (c_id[0] === value_id) {
            c_comment = index.c_content;
            break;
        }
    }

    document.getElementById("c_content").value = c_comment;
})();