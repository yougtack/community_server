const community = {
    data: []
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);
const userId = document.cookie.substr(7,);

function communityDelete() {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            userId: userId,
            b_id: community.data.b_id
        };

        xhttp.open("DELETE", url + `/board/community/${b_id}`, false);

        xhttp.onreadystatechange = () => {

            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }

        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteData));

        alert("삭제하였습니다.");
        location.href = "index.html";
    }
}

function printCommunity() {
    const type_text = document.querySelector(".type_text");

    if (community.data.b_type === "1") {
        type_text.innerText = "자유게시판";
    } else if (community.data.b_type === "2") {
        type_text.innerText = "게임게시판";
    } else if (community.data.b_type === "3") {
        type_text.innerText = "사진게시판";
    } else {
        type_text.innerText = "영상게시판";
    }

    let real_div = `<div class="user_community">`;
    real_div += `<p class="user_community_title">${community.data.b_title}</p>`;
    real_div += `<br>`;
    real_div += `<span class="txt">${community.data.userId}</span>`;
    real_div += `<span class="txt">${community.data.b_date}</span>`;
    real_div += `<span class="txt end_txt">${community.data.b_count}</span>`;
    if (userId === community.data.userId) {
        real_div += `<span><img class="delete_icon"  src="../static/delete.png" alt="deleteImg" onclick="communityDelete()" /></span>`;
        real_div += `<span><a href="modify.html?b_id=${b_id}"><img class="delete_icon"  src="../static/modify.png" alt="deleteImg" /></a></span>`;
    }
    real_div += `</div>`;
    real_div += `<div class="user_content">${community.data.b_content}</div>`;
    real_div += `<br><br><hr>`;
    real_div += `<a href="community.html?b_type=${community.data.b_type}"><input type="button" value="목록" style="float: right; width: 80px; height: 70px" /></a>`;
    document.write(real_div);

}

function printComment() {
    let real_comment = `<div class="comment">`;
    real_comment += `<p class="comment_title">댓글</p></div>`;
    for (let value of community.data.comments) {
        real_comment += `<div>${value.c_content}`;
    }
    real_comment += `</div>`;

    console.log(community.data);
    document.write(real_comment);
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

    printCommunity();
    printComment();

})();

