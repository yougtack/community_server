const myBoard = {
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
        const url = "http://localhost:8080";

        const data = {
            encode: userCookie
        }

        xhttp.open("POST", url + `/member/userInfo`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
            myBoard.userId = JSON.parse(xhttp.responseText);
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    }
})();

function passwordChange(user_password) {
    if(confirm("비밀번호를 변경하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";

        const passwordData = {
            userId: userCookie,
            userPw: user_password
        };

        xhttp.open("PUT", url + `/member`, false);

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
        xhttp.send(JSON.stringify(passwordData));
    }
}

function passwordCheck(){
    const user_password = document.getElementById("user_password").value;
    const user_password_check = document.getElementById("user_password_check").value;

    const pwPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*+=-]).{4,10}$/;
    if (user_password.trim().length <= 0) {
        alert("비밀번호를 입력해주세요.");
        user_password.focus();
        return false;
    } else if (!pwPattern.test(user_password)) {
        alert("비밀번호 4 ~ 10 글자\n" +
            "대문자 1개 이상 포함 특수문자 1개 이상 포함시켜주세요.");
        user_password.focus();
        return false;
    } else if (user_password !== user_password_check) {
        alert("비밀번호가 일치하지않습니다.");
        user_password_check.focus();
        return false;
    }

    passwordChange(user_password);
}

function profileChange() {
    if(confirm("프로필 사진을 변경하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";

        const img = document.getElementById("user_profile");
        let files = img;
        let formData = new FormData();

        formData.append('profile', files.files[0]);

        xhttp.open("PUT", url + `/member/profile/${myBoard.userId.userId}`, false);

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
    const user_profile = document.getElementById("user_profile_view");

    user_profile.innerHTML =
        `<img 
            class="u_profile" 
            id="test" 
            src="${myBoard.userId.file_path}" 
            alt="profile" 
         />`;

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/myBoardList/${myBoard.userId.userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        myBoard.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function myCommentInit(){
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/myCommentBoards/${myBoard.userId.userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        myBoard.commentData = JSON.parse(xhttp.responseText);
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

(function profilePrint() {
    let my_board = document.getElementById("my_board");

    my_board.innerHTML +=
        '<p class="profile_p">내가 작성한 게시글</p>';

    for(let value of myBoard.data){
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

    for(let value of myBoard.commentData){
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