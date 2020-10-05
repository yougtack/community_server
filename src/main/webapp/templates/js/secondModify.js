const second = {
    data: []
};

const c_id = location.search.substr(6, 2).split("&");
const b_id = location.search.substr(location.search.indexOf("b_id=") + 5);
const second_id = location.search.substr( 18,2).split("&");
const userId = document.cookie.substr(7,);

function secondModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    if (confirm("댓글을 수정합니다.")) {
        if (document.getElementById("second_content").value.trim().length <= 0) {
            alert("댓글을 작성해주세요.");
            document.getElementById("second_content").focus();
            return false;
        }
        const secondData = {
            second_id: second_id[0],
            c_content: document.getElementById("second_content").value,
            userId: userId
        };

        xhttp.open("PUT", url + `/comment/second`, false);

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

function commentValue() {
    let c_comment;

    for (let index of second.data.comments) {
        let value_id = "" + index.c_id;
        if (c_id[0] === value_id) {
            for(let second of index.secondComment){
                let secondValueId = "" + second.second_id;
                if(second_id[0] === secondValueId){
                    c_comment = second.c_content;
                    break;
                }
            }
        }
    }

    document.getElementById("second_content").value = c_comment;

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

        second.data = array;
    };

    xhttp.send();

    commentValue();

})();