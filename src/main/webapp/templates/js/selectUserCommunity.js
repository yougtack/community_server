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

function secondeDelete(second_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";
        const deleteData = {
            second_i: second_id,
            userId: userId
        };

        xhttp.open("DELETE", url + `/comment/second/${second_id}`, false);

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

function secondInsert(c_id) {
    console.log(document.getElementById(`second_content_${c_id}`).value);

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    const secondData = {
        c_id: c_id,
        userId: userId,
        c_content: document.getElementById(`second_content_${c_id}`).value
    };

    xhttp.open("POST", url + `/comment/second`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(secondData));

    location.href = `userCommunity.html?b_id=${b_id}`;
}

function enter() {
    if (window.event.keyCode === 13) {
        commentInsert();
    }
}

function second_enter(c_id) {
    if (window.event.keyCode === 13) {
        secondInsert(c_id);
    }
}

function secondBox(c_id){
    let second = document.getElementsByClassName(`second_${c_id}`);

    for (let i = 0; i < second.length; i++){
        if(second[i].style.display === 'none'){
            second[i].style.display = 'block';
        }else{
            second[i].style.display = 'none';
        }
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
})();

(function image() {
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
})();

(function printCommunity() {
    const txt = document.querySelector(".txt");

    /* 본문  */
console.log(txt);
    if (community.data.b_type === "1") {``
        txt.innerText = "자유게시판";
    } else if (community.data.b_type === "2") {
        txt.innerText = "게임게시판";
    } else if (community.data.b_type === "3") {
        txt.innerText = "음식게시판";
    } else {
        txt.innerText = "코딩게시판";
    }

    txt.innerHTML += `<div style="text-align: right;"><a href="community.html?b_type=${community.data.b_type}"><input type="button" value="목록" class="list_btn" /></a></div>`;

    let real_div = `<div>`;
    real_div += `<div class="info_div">`+
        `<p class="title">${community.data.b_title}</p>` +
        `<br>` +
        `<span><img class="profile" src="data:image/jpg;base64, ${community.data.profile}" alt="Image" /></span>` +
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
})();

(function printComment() {
    /* 댓글 */
    let real_comment = ``;

    real_comment +=
            `<p id="comment_length" style="margin: 0 0 0 50px;"></p>` +
            `<div style="text-align: center;"><input type="text" id="c_content" class="comment_box" onkeyup="enter()"/>` +
                `<button class="comment_btn" onclick="commentInsert()">등록</button>` +
            `</div>`+
            `<br><br>`;
    for (let value of community.data.comments) {
        real_comment +=
            `<hr>`+
            `<img class="second_profile" src="data:image/jpg;base64, ${value.profile}" alt="Image" />` +
            `<div class="userId">${value.userId}님` +
                `<button class="comment_txt" onclick="secondBox(${value.c_id})">댓글쓰기</button>` +
            `</div>`;
        real_comment +=
            `<div class="info">${value.c_date}</div>`;
        if (userId === value.userId) {
            real_comment +=
                `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="commentDelete(${value.c_id})" /></span>` +
                `<span><a href="commentModify.html?c_id=${value.c_id}&b_id=${b_id}"><img class="icon" src="../static/modify.png" alt="modifyImg" /></a></span>`;
        }
        real_comment +=
                `<br>` +
                `<pre class="c_content">${value.c_content}</pre>` +
        /* 대댓글 입력 */
                `<br>` +
                `<div class="second_${value.c_id}" style="display:none; text-align: center;">` +
                    `<input id="second_content_${value.c_id}" type="text" class="comment_box" onkeyup="second_enter(${value.c_id})"/>` +
                    `<button class="comment_btn" onclick="secondInsert(${value.c_id})">등록</button>` +
                `</div>`;

        /* 대댓글 */
        for(let value2 of value.secondComment) {
            real_comment +=
                `<hr style="width: 90%;">` +
                `<img class="arrow_icon" src="../static/arrows.png" alt="img"/>` +
                `<img class="second_profile" src="data:image/jpg;base64, ${value2.profile}" alt="Image" />` +
                `<div class="userId">${value2.userId}님` +
                    `<button class="comment_txt" onclick="secondBox(${value.c_id})">댓글쓰기</button>` +
                `</div>` +
                `<div class="info">${value2.c_date}</div>`;
            if (userId === value2.userId) {
                real_comment +=
                    `<span><img class="icon" src="../static/delete.png" alt="deleteImg" onclick="secondeDelete(${value2.second_id})" /></span>` +
                    `<span>` +
                        `<a href="secondModify.html?c_id=${value2.c_id}&second_id=${value2.second_id}&b_id=${b_id}">` +
                            `<img class="icon" src="../static/modify.png" alt="modifyImg" />` +
                        `</a>` +
                    `</span>`;
            }
            real_comment +=
                    `<br>`+
                    `<pre class="c_content_second">${value2.c_content}</pre>`;
        }
    }
    document.write(real_comment);
})();
