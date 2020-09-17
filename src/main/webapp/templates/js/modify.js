const community = {
    data: []
};

const userId = document.cookie.substr(7,);
const b_id = location.search.substr(location.search.indexOf("=") + 1);

function communityModify() {
    if (confirm("게시글을 수정합니다.")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const modifyData = {
            userId: userId,
        };

        xhttp.open("PUT", url + `/board/community/${b_id}`, false);

        xhttp.onreadystatechange = () => {

            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }

        };
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

    xhttp.send();

    document.getElementById("title").value = community.data.b_title;
    document.getElementById("content").value = community.data.b_content;

})();