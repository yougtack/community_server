const MY_BOARD = {
    data: [],
    commentData: []
}

function enter() {
    if (window.event.keyCode === 13) {
        passwordCheck();
    }
}

(function userCookieId() {
    if(userCookie !== "") {
        let xhttp = new XMLHttpRequest();
        const URL = "http://localhost:8080";

        const DATA = {
            encode: userCookie
        }

        xhttp.open("POST", URL + `/member/userInfo`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
            MY_BOARD.userId = JSON.parse(xhttp.responseText);
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DATA));
    }
})();

function passwordChange(user_password) {
    if(confirm("비밀번호를 변경하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const URL = "http://localhost:8080";

        const PASSWORD_DATA = {
            userId: userCookie,
            userPw: user_password
        };

        xhttp.open("PUT", URL + `/member`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("비밀번호가 변경되었습니다.");
                location.href = `index.html`;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(PASSWORD_DATA));
    }
}

function passwordCheck(){
    const USER_PASSWORD = document.getElementById("user_password").value;
    const USER_PASSWORD_CHECK = document.getElementById("user_password_check").value;

    const pwPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*+=-]).{4,10}$/;
    if (USER_PASSWORD.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        USER_PASSWORD.focus();
        return false;
    } else if (!pwPattern.test(USER_PASSWORD)) {
        alert("비밀번호 4 ~ 10 글자\n" +
            "대문자 1개 이상 포함 특수문자 1개 이상 포함시켜주세요.");
        USER_PASSWORD.focus();
        return false;
    } else if (USER_PASSWORD !== USER_PASSWORD_CHECK) {
        alert("비밀번호가 일치하지않습니다.");
        USER_PASSWORD_CHECK.focus();
        return false;
    }

    passwordChange(USER_PASSWORD);
}

function profileChange() {
    if(confirm("프로필 사진을 변경하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const URL = "http://localhost:8080";

        let files = document.getElementById("user_profile");
        let formData = new FormData();

        formData.append('profile', files.files[0]);

        xhttp.open("PUT", URL + `/member/profile/${MY_BOARD.userId.userId}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("프로필 사진 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("프로필 사진이 변경되었습니다.");
                location.href = `profile.html`;
            }
        };

        xhttp.send(formData);
    }
}

(function myBoardInit() {
    const USER_PROFILE = document.getElementById("user_profile_view");

    USER_PROFILE.innerHTML =
        `<img 
            class="u_profile" 
            id="test" 
            src="${MY_BOARD.userId.file_path}" 
            alt="profile" 
         />`;

    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/board/myBoardList/${MY_BOARD.userId.userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        MY_BOARD.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function myCommentInit(){
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/board/myCommentBoards/${MY_BOARD.userId.userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        MY_BOARD.commentData = JSON.parse(xhttp.responseText);
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

(function profilePrint() {
    let my_board = document.getElementById("my_board");

    my_board.innerHTML +=
        '<p class="profile_p">내가 작성한 게시글</p>';

    for(let value of MY_BOARD.data){
        const time = new Date(value.b_date);
        my_board.innerHTML +=
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
                        `<img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}`+
                    `</span>` +
                '</div>' +
            '</div>';
    }
})();

(function myCommentPrint() {
    let my_board = document.getElementById("my_comment");

    my_board.innerHTML +=
        '<p class="profile_p">내가 댓글을 작성한 게시글</p>';

    for(let value of MY_BOARD.commentData){
        const time = new Date(value.b_date);
        my_board.innerHTML +=
            `<div class="index_box">` +
                '<div class="index_item">' +
                `<span>` +
                    `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
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
})();