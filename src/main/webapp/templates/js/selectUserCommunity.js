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
        location.href = "login.html";
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

    /* 본문  */

    if (community.data.b_type === "1") {
        type_text.innerText = "자유게시판";
    } else if (community.data.b_type === "2") {
        type_text.innerText = "게임게시판";
    } else if (community.data.b_type === "3") {
        type_text.innerText = "음식게시판";
    } else {
        type_text.innerText = "코딩게시판";
    }

    type_text.innerHTML += `<div style="text-align: right;"><a href="community.html?b_type=${community.data.b_type}"><input type="button" value="목록" class="list_btn" /></a></div>`;

    let real_div = `<div>`;
    real_div += `<div class="info_div">`+
                    `<p class="title">${community.data.b_title}</p>` +
                    `<br>` +
                    `<span class="userId">${community.data.userId}</span><br>` +
                    `<span class="info">${community.data.b_date}</span>` +
                    `<span class="info">조회수 : ${community.data.b_count}</span>`;
    if (userId === community.data.userId) {
        real_div += `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="communityDelete()" /></span>`;
        real_div += `<span><a href="modify.html?b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
    }
    real_div += `</div>`;
    if (community.image.length > 0) {
        for (let index of community.image) {
            real_div += `<span>${index.fileName}<img style="width: 20px; height: 20px;" src="../static/download.png" alt="Image" onclick="imageDownload(${index.i_id})"></span>`;
        }
    }
    real_div += `<pre class="content">${community.data.b_content}</pre>` +
                '<br>';

    if (community.image.length > 0) {
        for (let index of community.image) {
            real_div += `<img src="data:image/jpg;base64, ${index.image}" alt="Image" />`;
        }
    }
    real_div += '</div>';

    real_div += `<br><hr><br>`;
    /* 댓글 */
    real_div += '<p class="txt" style="margin-left: 20px;">댓글</p>';

    document.write(real_div);
}

function enter() {
    if (window.event.keyCode === 13) {
        commentInsert();
    }
}

function printComment() {
    let real_comment = ``;
    real_comment += `<div style="text-align: center;"><input type="text" id="c_content" class="comment_box" onkeyup="enter()"/>` +
                    `<button class="comment_btn" onclick="commentInsert()">등록</button></div><br><br>`;
    for (let value of community.data.comments) {
        real_comment += `<hr><div class="userId">${value.userId}님</div>`;
        real_comment += `<div class="info">${value.c_date}</div>`;
        if (userId === value.userId) {
            real_comment += `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="commentDelete(${value.c_id})" /></span>`;
            real_comment += `<span><a href="commentModify.html?c_id=${value.c_id}&b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
        }
        real_comment += `<br>`;
        real_comment += `<div class="c_content">${value.c_content}`;
        real_comment += `</div>`;
        for(let value2 of value.secondComment) {
            real_comment += `<hr><img style="width: 40px; height: 40px; float:left;" src="../static/arrows.png" alt="img"/><span>` +
                                `<div class="userId">${value2.userId}님</div>` +
                                `<div class="info">${value2.c_date}</div>`;
            if (userId === value2.userId) {
                real_comment += `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="commentDelete(${value2.c_id})" /></span>`;
                real_comment += `<span><a href="commentModify.html?c_id=${value2.c_id}&b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
            }
            real_comment += `<br>`+
                            `<div class="c_content_second">${value2.c_content}</div>` +
                        `</span>`;
        }
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

    console.log(community.data);

    image();
    printCommunity();
    printComment();
})();

