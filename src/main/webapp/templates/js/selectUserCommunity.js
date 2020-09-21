const community = {
    data: [],
    image: []
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);
const userId = document.cookie.substr(7,);

function imageDownload(i_id) {
    const url = "http://localhost:8080";

    location.href = url + `/board/download/${i_id}`;

}

function commentInsert() {
    if (userId === "") {
        alert("로그인이 필요합니다.");
        return false;
    } else if (document.getElementById("c_content").value.trim().length <= 0) {
        alert("댓글에 내용을 작성해주세요.");
        document.getElementById("c_content").focus();
        return false;
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const commentData = {
        userId: userId,
        b_id: b_id,
        c_content: document.getElementById("c_content").value
    };

    xhttp.open("POST", url + `/comment`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(commentData));

    location.href = `userCommunity.html?b_id=${b_id}`;

}

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

function commentDelete(c_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            c_id: c_id,
            userId: userId
        };

        xhttp.open("DELETE", url + `/comment/${deleteData.c_id}`, false);

        xhttp.onreadystatechange = () => {

            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }

        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteData));

        alert("삭제하였습니다.");

        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function printCommunity() {
    const type_text = document.querySelector(".type_text");

    if (community.data.b_type === "1") {
        type_text.innerText = "자유게시판";
    } else if (community.data.b_type === "2") {
        type_text.innerText = "게임게시판";
    } else if (community.data.b_type === "3") {
        type_text.innerText = "음식게시판";
    } else {
        type_text.innerText = "코딩게시판";
    }

    let real_div = `<div class="user_community">`;
    real_div += `<p class="user_community_title">${community.data.b_title}</p>`;
    real_div += `<br>`;
    real_div += `<span class="txt">${community.data.userId}</span>`;
    real_div += `<span class="txt">${community.data.b_date}</span>`;
    real_div += `<span class="txt end_txt">${community.data.b_count}</span>`;
    if (userId === community.data.userId) {
        real_div += `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="communityDelete()" /></span>`;
        real_div += `<span><a href="modify.html?b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
    }
    real_div += `</div>`;
    real_div += `<div class="user_content">${community.data.b_content}</div>`;
    if (community.image.length > 0) {
        for (let index of community.image) {
            real_div += `<div style="float: right;">${index.fileName}<img src="../static/download.png" alt="Image"  onclick="imageDownload(${index.i_id})"></div>`;
            real_div += `<div><img src="data:image/jpg;base64, ${index.image}" alt="Image" /></div>`;
        }
    }

    /* 댓글  */
    real_div += `<br><br><hr>`;
    real_div += `<div style="width: auto; height: 70px;"><p class="comment_title">댓글</p><a href="community.html?b_type=${community.data.b_type}"><input type="button" value="목록" style="width: 50px; height: 20px" /></a></div><br><br>`;
    document.write(real_div);

}

function printComment() {
    let real_comment = ``;
    real_comment += `<div style="text-align: left;"><input type="text" id="c_content" style=" width: 70%; height: 40px;"/><button style=" width: 50px; height: 45px;" onclick="commentInsert()">등록</button></div>`;
    for (let value of community.data.comments) {
        real_comment += `<div class="comment">${value.userId}님 댓글`;
        if (userId === value.userId) {
            real_comment += `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="commentDelete(${value.c_id})" /></span>`;
            real_comment += `<span><a href="commentModify.html?c_id=${value.c_id}&b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
        }
        real_comment += `<br>`;
        real_comment += `${value.c_content}`;
        real_comment += `</div>`;
    }
    document.write(real_comment);
}

function image() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("GET", url + `/board/getImage/${b_id}`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const arrayImage = JSON.parse(xhttp.responseText);

        community.image = arrayImage;

    };

    xhttp.send();
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

    image();
    printCommunity();
    printComment();

})();

