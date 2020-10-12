const userInfo = {
    data: []
};

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + "/member/memberList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            userInfo.data = array;
        }
    };

    xhttp.send();
})();

function logout() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/member/logout`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function myInfoBox() {
    let box = document.getElementsByClassName(`box`);

    for (let i = 0; i < box.length; i++){
        if(box[i].style.display === 'none'){
            box[i].style.display = 'block';
        }else{
            box[i].style.display = 'none';
        }
    }
}

let real_header = ``;

real_header +=
    '<div class="main_sidebar">' +
        '<a href="../templates/index.html"><img src="../static/home_icon.png" alt="HomeIcon" style="margin: 10px 0 0 10px;" /></a>';
if (!!document.cookie) {
    for (let value of userInfo.data) {
        if (value.userId === document.cookie.substr(7,)) {
            real_header += `<img class="profile" src="data:image/jpg;base64, ${value.profile}" alt="profile" />`;
        }
    }
    real_header +=
        `${document.cookie.substr(7,)}님` +
        `<img class="main_sidebar_icon" src="../static/settings.png" alt="Img" onclick="myInfoBox()" />` +
        `<div class="box info_box">` +
            `<a href="profile.html">프로필 변경</a>` +
            `<br>` +
            `<a href="password.html">비밀번호 변경</a>` +
        `</div>`;
}
real_header +=
        '<br>' +
        '<br>' +
        '<div style="margin-bottom: 20px;">' +
            '<input type="text" id="word" style="width: 120px; padding: 10px;" placeholder="제목 검색"/>' +
            '<input type="button" value="검색" onclick="s_search()" style="width: 55px; padding: 10px;"/>' +
        '</div>' +
        '<div class="main_category">' +
            '<a href="community.html?b_type=1">자유게시판<img class="main_sidebar_icon" src="../static/people.png" alt="img"/></a>' +
        '</div>'+
        '<div class="main_category">' +
            '<a href="community.html?b_type=2">게임게시판<img class="main_sidebar_icon" src="../static/game.png" alt="img"/></a>' +
        '</div>' +
        '<div class="main_category">' +
            '<a href="community.html?b_type=3">음식게시판<img class="main_sidebar_icon" src="../static/food.png" alt="img"/></a>' +
        '</div>' +
        '<div class="main_category">' +
            '<a href="community.html?b_type=4">코딩게시판<img class="main_sidebar_icon" src="../static/keyboard.png" alt="img"/></a>' +
        '</div>';

if (!!document.cookie) {
    real_header +=
        `<a href="" onclick="logout()"><img class="main_sidebar_icon" src="../static/logout.png" alt="HomeIcon" onclick="logout()" />Logout</a>`;
    if (document.cookie.substr(7,) === "admin") {
        real_header +=
            `<a href="admin.html"><img class="main_sidebar_icon" src="../static/admin.png" alt="Img" />USER</a>`;
    }
} else {
    real_header +=
        `<div">` +
            `<a href="../templates/login.html"><img class="main_sidebar_icon" src="../static/login.png" alt="LoginIcon" />Login</a>` +
            `<a href="signUp.html"><img class="main_sidebar_icon" src="../static/person.png" alt="SignUpIcon" />SignUp</a>` +
        `</div>`;
}

real_header += '</div>';

document.write(real_header);