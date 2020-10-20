const second = {
    data: []
};

const c_id = location.search.substr(6, 2).split("&");
const b_id = location.search.substr(location.search.indexOf("b_id=") + 5);
const recomment_id = location.search.substr(location.search.indexOf("recomment_id") + 13).split("&");
const userId = document.cookie.substr(7,);

function secondModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    if (confirm("댓글을 수정합니다.")) {
        if (document.getElementById("second_content").value.trim().length <= 0) {
            alert("댓글을 작성해주세요.");
            document.getElementById("second_content").focus();
            return false;
        } else if (document.getElementById("second_content").value.length > 50) {
            alert("글자 제한 수를 초과하였습니다.");
            document.getElementById("second_content").focus();
            return false;
        }
        const secondData = {
            c_id: c_id[0],
            c_content: document.getElementById("second_content").value,
            userId: userId
        };

        xhttp.open("PUT", url + `/comment`, false);

        xhttp.onreadystatechange = () => {

            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(secondData));

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
        second.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function commentValue() {
    let c_comment;

    for (let index of second.data.comments) {
        if (index.c_id === parseInt(c_id[0])) {
            if (index.recomment_id === parseInt(recomment_id[0])) {
                c_comment = index.c_content;
            }
        }
    }
    document.getElementById("second_content").value = c_comment;
})();
