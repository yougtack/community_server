const COMMUNITY = {
    data: [],
    image: [],
    user:[]
};

const B_ID = location.search.substr(location.search.indexOf("=") + 1);
const USER_ID = document.cookie.substr(7,);

(function userId() {
    if(userCookie !== "") {
        let xhttp = new XMLHttpRequest();
        const url = "http://3.133.28.138:8080";

        const DATA = {
            encode: userCookie
        }

        xhttp.open("POST", URL + `/member/userInfo`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
            COMMUNITY.user  = JSON.parse(xhttp.responseText);
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DATA));
    }
})();

function imageDownload(path) {
    location.href = `http://3.133.28.138:8080/board/download/${path}`;
}

function commentInsert() {
    if (document.getElementById("c_content").value.trim().length <= 0) {
        alert("댓글에 내용을 작성해주세요.");
        document.getElementById("c_content").focus();
        return false;
    } else if (document.getElementById("c_content").value.length > 50) {
        alert("글자 제한 수를 초과하였습니다.");
        document.getElementById("c_content").focus();
        return false;
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";

    const COMMENT_DATA = {
        userId: USER_ID,
        b_id: B_ID,
        c_content: document.getElementById("c_content").value
    };

    xhttp.open("POST", URL + `/comment`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            location.href = `userCommunity.html?b_id=${B_ID}`;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(COMMENT_DATA));
}

function communityDelete() {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://3.133.28.138:8080";
        const DELETE_DATA = {
            userId: USER_ID,
            b_id: COMMUNITY.data.b_id
        };

        xhttp.open("DELETE", URL + `/board/community/${B_ID}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = "index.html";
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DELETE_DATA));
    }
}

function secondDelete(c_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://3.133.28.138:8080";
        const DELETE_DATA = {
            c_id: c_id,
            userId: USER_ID
        };

        xhttp.open("DELETE", URL + `/comment/${c_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("대댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = `userCommunity.html?b_id=${B_ID}`;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DELETE_DATA));
    }
}

function commentDelete(c_id) {
    if (confirm("해당 댓글을 삭제하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://3.133.28.138:8080";
        const DELETE_DATA = {
            c_id: c_id,
            userId: USER_ID
        };

        xhttp.open("DELETE", URL + `/comment/${DELETE_DATA.c_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = `userCommunity.html?b_id=${B_ID}`;
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DELETE_DATA));
    }
}

function secondInsert(c_id) {

    // 대댓글 limit
    let limit;
    for(let value of COMMUNITY.data.comments){
        if (value.c_id === c_id){
            limit = value;
        }
    }
    if (limit.depth === 5){
        alert("대댓글은 최대 5번까지 가능합니다.");
        location.href = `userCommunity.html?b_id=${B_ID}`;
        return false;
    }

    if (document.getElementById(`second_content_${c_id}`).value.trim().length <= 0) {
        alert("댓글에 내용을 작성해주세요.");
        document.getElementById(`second_content_${c_id}`).focus();
        return false;
    } else if (document.getElementById(`second_content_${c_id}`).value.length > 50) {
        alert("글자 제한 수를 초과하였습니다.");
        document.getElementById(`second_content_${c_id}`).focus();
        return false;
    }
    let commentInfo;

    for(let value of COMMUNITY.data.comments){
        if (value.c_id === c_id){
            commentInfo = value;
        }
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";
    const SECOND_DATA = {
        b_id: B_ID,
        userId: USER_ID,
        c_content: document.getElementById(`second_content_${c_id}`).value,
        group_id : commentInfo.group_id,
        parent_reply_id: c_id,
        depth: commentInfo.depth,
        order_no : commentInfo.order_no
    };

    xhttp.open("POST", URL + `/comment/second`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("대댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else{
            location.href = `userCommunity.html?b_id=${B_ID}`;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(SECOND_DATA));
}

function secondEnter(c_id) {
    if (window.event.keyCode === 13) {
        secondInsert(c_id);
    }
}

function commentEnter() {
    if (window.event.keyCode === 13) {
        commentInsert();
    }
}

function secondBox(c_id){
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return false;
    }
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

(function image() {
    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";
    xhttp.open("GET", URL + `/board/imagePath/${B_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
        COMMUNITY.image = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

function download(){
    let downloadBox = document.getElementsByClassName(`download_box`);

    for (let i = 0; i < downloadBox.length; i++){
        if(downloadBox[i].style.display === 'none'){
            downloadBox[i].style.display = 'block';
        }else{
            downloadBox[i].style.display = 'none';
        }
    }
}

function infoBox() {
    let box = document.getElementsByClassName(`community_info_box`);

    for (let i = 0; i < box.length; i++){
        if(box[i].style.display === 'none'){
            box[i].style.display = 'block';
        }else{
            box[i].style.display = 'none';
        }
    }
}

let cnt = 0;

(function printCommunity() {
    const TXT = document.querySelector(".txt");
    const TIME = new Date(COMMUNITY.data.b_date);

    for (let c_cnt of COMMUNITY.data.comments) {
        ++cnt
    }


    /* 본문  */
    if (COMMUNITY.data.b_type === "1") {
        TXT.innerText = "자유게시판";
    } else if (COMMUNITY.data.b_type === "2") {
        TXT.innerText = "게임게시판";
    } else if (COMMUNITY.data.b_type === "3") {
        TXT.innerText = "음식게시판";
    } else {
        TXT.innerText = "코딩게시판";
    }
    //<input type="button" value="목록" class="list_btn" />
    TXT.innerHTML +=
        `<div style="text-align: right;">` +
            `<a href="community.html?b_type=${COMMUNITY.data.b_type}">` +
                `<img src="../static/list.png" alt="IMG" />` +
            `</a>` +
        `</div>`;

    let real_div = '';

    real_div +=
        `<div class="info_div div_border">`+
            '<div style="margin: 10px 0 0 0;">' +
                `<span>` +
                    `<img 
                        class="community_profile user_cursor" 
                        src="${COMMUNITY.data.file_path}" 
                        alt="Image" 
                        onclick="location.href='userInfo.html?userId=${COMMUNITY.data.userId}'" 
                     />` +
                `</span>` +
                '<div style="display: inline-block;">' +
                    `<span 
                        class="userId user_cursor" 
                        onclick="location.href='userInfo.html?userId=${COMMUNITY.data.userId}'"
                     >${COMMUNITY.data.userId}
                     </span>` +
                    `<br>` +
                    `<span class="info">` +
                        `${TIME.getFullYear()}-${TIME.getMonth() + 1}-${TIME.getDate()} ` +
                        `${TIME.getHours() < 10 ? `0${TIME.getHours()}` : TIME.getHours()}:` +
                        `${TIME.getMinutes() < 10 ? `0${TIME.getMinutes()}` : TIME.getMinutes()}:` +
                        `${TIME.getSeconds() < 10 ? `0${TIME.getSeconds()}` : TIME.getSeconds()} ` +
                    `</span>` +
                    `<span class="info">` +
                        `<img class="index_img_size" src="../static/comment.png" alt="eyeIcon" />${cnt} `+
                    `</span>` +
                    `<span class="info">` +
                        `<img 
                            class="index_img_size"
                            src="../static/eye.png"
                            alt="eyeIcon"
                             />${COMMUNITY.data.b_count}` +
                    `</span>` +
                '</div>' +
                `<span onclick="infoBox()">` +
                    `<img src="../static/more_vert.png" class="icon" alt="img" style="cursor: pointer;" />` +
                `</span>` +
                '<div class="community_info_box" style="float: right;">' +
                    `<a href="boardComment.html?b_id=${B_ID}" class="comment_box_info_box_size">답글</a>`;
    if (COMMUNITY.user.userId  === COMMUNITY.data.userId) {
        real_div +=
                    `<div class="comment_box_info_box_size">` +
                        `<a href="modify.html?b_id=${B_ID}">수정</a>` +
                    `</div>` +
                    `<div class="comment_box_info_box_size" onclick="communityDelete()">삭제</div>`;
    }
    real_div +=
                `</div>` +
            '</div>' +
        '</div>';
    if (COMMUNITY.image.length > 0) {
        real_div +=
            `<div style="text-align: right; margin: 10px 0 0 0;">` +
                `<span style="cursor: pointer;" onclick="download()">` +
                    `<img 
                        src="../static/folder.png" 
                        alt="folder" 
                        style="width: 20px; height: 20px;"
                     />첨부파일[${COMMUNITY.image.length}]` +
                `</span>` +
            `</div>` +
            '<div class="download_box">';
        for (let index of COMMUNITY.image) {
            let image_name = index.split("s/");
            real_div +=
                `<div>` +
                    `<p class="download_image_name">${image_name[1]} </p>`+
                    `<img 
                        style="width: 20px; height: 20px; cursor: pointer;" 
                        src="../static/download.png" 
                        alt="Image" 
                        onclick="imageDownload('${image_name[1]}')"
                     />` +
                `</div>`;
        }
        real_div +=
            '</div>';
    }
    real_div +=
        '<div class="div_border">' +
            `<p class="b_id_size" style="margin: 10px 0 0 25px; color: #999">#${COMMUNITY.data.b_id}</p>` +
            `<p class="title">${COMMUNITY.data.b_title}`;

    real_div +=
            `</p>` +
            '<hr style="width: 93%; border-color: #ddd">' +
            `<pre class="content">${COMMUNITY.data.b_content}</pre>` +
        '</div>';

        let img_one = 0;

        real_div +=
            `<div id="myModal" class="modal">` +
                `<div class="modal-content">` +
                    `<span class="close">&times;</span>` +
                    `<img src="../static/left_arrow.png" alt="left_arrow" class="left_btn" onclick="leftBtn()"/>` +
                    `<div class="modal_img_div">` ;
        for (let index of COMMUNITY.image) {
            if(img_one !== 0) {
                real_div +=
                    `<span class="imgDiv" style="display: none;">` +
                        `<img class="content_image" src="${index}" alt="Image"/>` +
                    '</span>';
            }else {
                real_div +=
                    `<span class="imgDiv">` +
                        `<img class="content_image" src="${index}" alt="Image"/>` +
                    '</span>';
            }
            ++img_one;
        }
                   real_div +=
                       `</div>` +
                        `<img 
                            src="../static/right_arrow.png"
                            alt="right_arrow" 
                            class="right_btn" 
                            onclick="rightBtn()"
                         />` +
                    `</div>` +
                `</div>`;

    document.write(real_div);
})();

(function printComment() {
    /* 댓글 */
    let  real_comment =
        '<div class="div_border" style="margin: 30px 0 0 0;">' +
            `<div class="div_border comment_title" style="margin: 0 0 0 0;">댓글  ${cnt}</div>`;
    let hr_count = 0;
    for (let value of COMMUNITY.data.comments) {
        const TIME = new Date(value.c_date);

        // 답글일 때 제목 margin값 넣기
        if (value.depth > 0){
            let margin_left_value = 40 * value.depth;
            real_comment +=
                `<div style="border: 1px solid #ddd;">` +
                `<span style="margin:0 0 0 ${margin_left_value}px;">` +
                    `<img 
                        class="second_profile user_cursor"
                        src="${value.file_path}"
                        alt="Image" 
                        onclick="location.href='userInfo.html?userId=${value.userId}'" 
                     />` +
                `</span>`;
        } else {
            real_comment +=
                '<div style="border: 1px solid #ddd; margin: 0;">' +
                `<span>` +
                    `<img class="second_profile user_cursor" src=" ${value.file_path}"
                        alt="Image" onclick="location.href='userInfo.html?userId=${value.userId}'" />` +
                `</span>` ;
        }

            real_comment +=
                    '<div style="display: inline-block;">' +
                        `<span 
                            class="userId user_cursor" 
                            onclick="location.href='userInfo.html?userId=${value.userId}'">${value.userId}님
                         </span>` +
                            `<span class="comment_txt" onclick="secondBox(${value.c_id})"> 댓글쓰기</span>` +
                        '<br>';
            real_comment +=
                        `<span class="info">` +
                            `${TIME.getFullYear()}-${TIME.getMonth() + 1}-${TIME.getDate()} ` +
                            `${TIME.getHours() < 10 ? `0${TIME.getHours()}` : TIME.getHours()}:` +
                            `${TIME.getMinutes() < 10 ? `0${TIME.getMinutes()}` : TIME.getMinutes()}:` +
                            `${TIME.getSeconds() < 10 ? `0${TIME.getSeconds()}` : TIME.getSeconds()}`;
            if(value.updateCheck > 0) {
                real_comment +=
                    '<span class="update_check"> (수정됨)</span>';
            }
            real_comment +=
                        '</span>' +
                    '</div>';
            if (COMMUNITY.user.userId === value.userId) {
                real_comment +=
                    `<span>` +
                        `<img 
                            class="icon" 
                            src="../static/delete.png" 
                            alt="deleteImg" 
                            onclick="commentDelete(${value.c_id})" 
                         />` +
                    `</span>` +
                    `<span>` +
                        `<a href="commentModify.html?c_id=${value.c_id}&b_id=${B_ID}">` +
                            `<img class="icon" src="../static/edit.png" alt="modifyImg" />` +
                        `</a>` +
                    `</span>`;
            }
        if (value.depth > 0){
            let margin_left_value = 35 * (value.depth + 2);
            real_comment +=
                `<pre class="c_content" style="margin: 20px 0 0 ${margin_left_value}px;">${value.c_content}</pre>` ;
        } else {
            real_comment +=
                `<pre class="c_content" style="margin: 20px 0 0 65px;">${value.c_content}</pre>` ;
        }
        real_comment +=
            '</div>';
                    /* 대댓글 입력 */
            real_comment +=
                    `<div class="second_${value.c_id}" style="display:none; text-align: center;">` +
                        `<p id="second_length" style="text-align: left; margin: 20px 0 0 100px;"></p>` +
                        `<input 
                            id="second_content_${value.c_id}" 
                            type="text" 
                            class="comment_box" 
                            onkeypress="secondEnter(${value.c_id})"
                         />` +
                        `<button class="comment_btn" onclick="secondInsert(${value.c_id})">등록</button>` +
                    `</div>`;
        ++hr_count;
    }
    real_comment +=
            '</div>';

    /* 댓글 */
    real_comment +=
        '<div class="div_border" style="height: 130px;">';
    if (USER_ID !== "") {
        real_comment +=
            `<p id="comment_length" class="comment_length"></p>` +
                `<div style=" margin: 30px 0 0 100px;">` +
                    `<textarea 
                        id="c_content" 
                        class="comment_box textarea_resize" 
                        onkeypress="commentEnter()"></textarea>` +
                    `<span>` +
                        `<button class="comment_btn" style="position: absolute;" onclick="commentInsert()">등록</button>` +
                    `</span>` +
                    '<p id="warning_message" class="warning_message"></p>' +
                `</div>`;
    } else {
        real_comment +=
            '<div style="text-align: center; margin: 50px 0 0 0;">로그인 후 이용할 수 있습니다.</div>';
    }
    real_comment +=
        '</div>';

    document.write(real_comment);
})();