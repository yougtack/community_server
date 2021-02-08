const COMMUNITY = {
    data: []
};

const C_ID = location.search.substr(6, ).split("&");
const B_ID = location.search.substr(location.search.indexOf("b_id=") + 5);
const USER_ID = document.cookie.substr(7,);

function commentModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";

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
        const MODIFY_DATA = {
            c_id: C_ID[0],
            c_content: document.getElementById("c_content").value,
            userId: USER_ID
        };

        xhttp.open("PUT", URL + `/comment`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("댓글 수정중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                location.href = `userCommunity.html?b_id=${B_ID}`;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(MODIFY_DATA));
    }
}

function cancel() {
    location.href = `userCommunity.html?b_id=${B_ID}`;
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + `/board/view/${B_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        COMMUNITY.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function commentValue() {
    let c_comment;

    for (let index of COMMUNITY.data.comments) {
        let value_id = "" + index.c_id;
        if (C_ID[0] === value_id) {
            c_comment = index.c_content;
            break;
        }
    }

    document.getElementById("c_content").value = c_comment;
})();