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

let real_header = '';
real_header += `<a href="../templates/index.html" class="icon_a"><img class="home_icon header_icon" src="../static/home_icon.png" alt="HomeIcon" /></a>`;
real_header += `<a href="../templates/insert.html"><img class="header_icon" src="../static/create.png" alt="HomeIcon" /> </a>`;

if (document.cookie.substr(7,) === "admin") {
    real_header += `<a href="admin.html"><img class="header_icon" src="../static/admin.png" alt="Img" /></a>`;
}
if (!!document.cookie) {
    real_header += `<a href="" style="float: right;"><img class="header_icon" src="../static/logout.png" alt="HomeIcon" onclick="logout()" /></a>`;
    real_header += `<p class="info">${document.cookie.substr(7,)}님</p>`;
    for (let index of userInfo.data) {
        if (index.userId === document.cookie.substr(7,)) {
            if (index.count >= 30) {
                real_header += `<p class="info">나무 등급</p>`;
            } else if (index.count >= 20) {
                real_header += `<p class="info">가지 등급</p>`;
            } else if (index.count >= 10) {
                real_header += `<p class="info">새싹 등급</p>`;
            } else if (index.count <= 0) {
                real_header += `<p class="info">씨앗 등급</p>`;
            }
        }
    }
} else {
    real_header += `<a href="../templates/login.html" style="float: right;"><img class="header_icon" src="../static/login.png" alt="HomeIcon" /></a>`;
}
document.write(real_header);