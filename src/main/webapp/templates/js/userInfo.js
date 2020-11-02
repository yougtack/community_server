const userInfoProfile = {
    boardData : [],
    commentDate : []
}

const userId = location.search.substr(location.search.indexOf("=") + 1);

(function myBoardInit() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/myBoardList/${userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        userInfoProfile.boardData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    // Math.floor는 소수점 이하를 버림.
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) {
        return '방금전';
    }
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

(function myCommentInit(){
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/myCommentBoards/${userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        userInfoProfile.commentData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function info() {
    const user_profile = document.getElementById("user_profile_view");

    for (let profile of userInfo.data) {
        if(profile.userId === userId) {
            user_profile.innerHTML =
                `<img style="width: 150px; height: 150px; border-radius: 80px; border:1px solid #ddd;"
                        src="${profile.file_path}" alt="profile" />`;
        }
    }

    const user_info_userId = document.querySelector(".user_info_userId");
    user_info_userId.innerText = userId;

    const community_count = document.getElementById("community_count");
    const comment_count = document.getElementById("comment_count");

    let count = 0;

    let board_div = document.querySelector(".board_div");
    let comment_div = document.querySelector(".comment_div");

    board_div.innerHTML =
        '<p class="user_info_txt">작성한 게시글</p>';
    for(let value of userInfoProfile.boardData) {
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
    community_count.innerText = count;

    comment_div.innerHTML =
        '<p class="user_info_txt">작성한 댓글</p>';
    count = 0;
    for(let value of userInfoProfile.commentData) {
        ++count;
            const time = new Date(value.b_date);
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

    comment_count.innerText = count;
})();