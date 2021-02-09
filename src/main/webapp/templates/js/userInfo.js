const USER_INFO_PROFILE = {
    boardData : [],
    commentDate : []
}

const USER_ID = location.search.substr(location.search.indexOf("=") + 1);

(function myBoardInit() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + `/board/myBoardList/${USER_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        USER_INFO_PROFILE.boardData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

function timeForToday(value) {
    const TODAY = new Date();
    const TIME_VALUE = new Date(value);

    // Math.floor는 소수점 이하를 버림.
    const BETWEEN_TIME = Math.floor((TODAY.getTime() - TIME_VALUE.getTime()) / 1000 / 60);
    if (BETWEEN_TIME < 1) {
        return '방금전';
    }
    if (BETWEEN_TIME < 60) {
        return `${BETWEEN_TIME}분전`;
    }

    const BETWEEN_TIME_HOUR = Math.floor(BETWEEN_TIME / 60);
    if (BETWEEN_TIME_HOUR < 24) {
        return `${BETWEEN_TIME_HOUR}시간전`;
    }

    const BETWEEN_TIME_DAY = Math.floor(BETWEEN_TIME / 60 / 24);
    if (BETWEEN_TIME_DAY < 365) {
        return `${BETWEEN_TIME_DAY}일전`;
    }

    return `${Math.floor(BETWEEN_TIME_DAY / 365)}년전`;
}

(function myCommentInit(){
    let xhttp = new XMLHttpRequest();
    const URL = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + `/board/myCommentBoards/${USER_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        USER_INFO_PROFILE.commentData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function info() {
    const USER_PROFILE = document.getElementById("user_profile_view");

    console.log(userInfo);
    for (let profile of userInfo.data) {
        if(profile.userId === USER_ID) {
            USER_PROFILE.innerHTML =
                `<img style="width: 150px; height: 150px; border-radius: 80px; border:1px solid #ddd;"
                        src="${profile.file_path}" alt="profile" />`;
        }
    }

    const USER_INFO_USERID = document.querySelector(".user_info_userId");
    USER_INFO_USERID.innerText = USER_ID;

    const COMMUNITY_COUNT = document.getElementById("community_count");
    const COMMENT_COUNT = document.getElementById("comment_count");

    let count = 0;

    let board_div = document.querySelector(".board_div");
    let comment_div = document.querySelector(".comment_div");

    board_div.innerHTML =
        '<p class="user_info_txt">작성한 게시글</p>';
    for(let value of USER_INFO_PROFILE.boardData) {
        let time = new Date(value.b_date);
        ++count;
        board_div.innerHTML +=
            `<div class="index_box">` +
                '<div class="index_item">' +
                    `<span>` +
                        `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
                    `</span>` +
                    `<span class="cnt_size">[${value.commentCount}]</span>` +
                    `<span class="index_date">${timeForToday(time)}</span>` +
                    '<br>' +
                    `<span class="index_userId">${value.userId}</span>` +
                    `<span class="index_img">` +
                        `<img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}` +
                    `</span>` +
                '</div>' +
            '</div>';
    }
    COMMUNITY_COUNT.innerText = count;

    comment_div.innerHTML =
        '<p class="user_info_txt">작성한 댓글</p>';
    count = 0;
    for(let value of USER_INFO_PROFILE.commentData) {
        ++count;
            let time = new Date(value.b_date);
            comment_div.innerHTML +=
                `<div class="index_box">` +
                    '<div class="index_item">' +
                        `<span>` +
                            `<a 
                                class="index_title"
                                 href="userCommunity.html?b_id=${value.b_id}">${value.b_title}
                             </a>` +
                        `<span class="cnt_size">[${value.commentCount}]</span>` +
                        `</span>` +
                        `<span class="index_date">${timeForToday(time)}</span>` +
                        '<br>' +
                        `<span class="index_userId">${value.userId}</span>` +
                        `<span class="index_img">` +
                            `<img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}` +
                        `</span>` +
                    '</div>' +
                '</div>';
        }

    COMMENT_COUNT.innerText = count;
})();