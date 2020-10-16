const myBoard = {
    data: [],
    commentData: []
}

const userId = document.cookie.substr(7,);

function enter() {
    if (window.event.keyCode === 13) {
        passwordCheck();
    }
}

function passwordChange(user_password) {
    if(confirm("비밀번호를 변경하시겠습니까?")) {
        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";

        const passwordData = {
            userId: userId,
            userPw: user_password
        };

        xhttp.open("PUT", url + `/member`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(passwordData));

        alert("비밀번호가 변경되었습니다.");
        location.href = `index.html`;
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

        xhttp.open("PUT", url + `/member/profile/${userId}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
        };

        xhttp.send(formData);

        alert("프로필 사진이 변경되었습니다.");
        location.href = `profile.html`;
    }
}

(function myBoardInit() {
    const user_profile = document.getElementById("user_profile_view");

    for (let profile of userInfo.data) {
        if(profile.userId === userId) {
            user_profile.innerHTML = `<img class="u_profile" id="test" src="data:image/jpg;base64, ${profile.profile}" alt="profile" />`;
        }
    }

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/myBoardList/${userId}`, false);

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

    xhttp.open("GET", url + `/board/myCommentBoards/${userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        myBoard.commentData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function profilePrint() {
    let my_board = document.getElementById("my_board");

    my_board.innerHTML +=
        '<p class="profile_p">내가 작성한 게시글</p>';

    for(let value of myBoard.data){
        const time = new Date(value.b_date * 1000);
        my_board.innerHTML +=
            `<div class="index_box">` +
                '<div class="index_item">' +
                    `<span>` +
                        `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
                    `<span class="cnt_size">[${value.commentCount}]</span>` +
                    `</span>` +
                    `<span class="index_date">` +
                        `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                        `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                        `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                        `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                    `</span>` +
                    '<br>' +
                    `<span class="index_userId">${value.userId}</span>` +
                    `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                '</div>' +
            '</div>';
    }
})();

(function myCommentPrint() {
    let my_board = document.getElementById("my_comment");

    my_board.innerHTML +=
        '<p class="profile_p">내가 댓글을 작성한 게시글</p>';

    for(let value of myBoard.commentData){
        const time = new Date(value.b_date * 1000);
        my_board.innerHTML +=
            `<div class="index_box">` +
                '<div class="index_item">' +
                `<span>` +
                    `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
                `<span class="cnt_size">[${value.commentCount}]</span>` +
                `</span>` +
                `<span class="index_date">` +
                    `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                    `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                    `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                    `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                `</span>` +
                '<br>' +
                `<span class="index_userId">${value.userId}</span>` +
                `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                '</div>' +
            '</div>';
    }
})();