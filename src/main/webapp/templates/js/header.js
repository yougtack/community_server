function logout() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/member/logout`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send();

}

let real_header = '';
real_header += `<a href="../templates/index.html" class="icon_a"><img class="home_icon header_icon" src="../static/home_icon.png" alt="HomeIcon" /></a>`;
real_header += `<a href="../templates/insert.html"><img class="header_icon" src="../static/create.png" alt="HomeIcon" /> </a>`;
if (!!document.cookie) {
    real_header += `<a href="" style="float: right;"><img class="header_icon" src="../static/logout.png" alt="HomeIcon" onclick="logout()" /></a>`;
}else {
    real_header += `<a href="../templates/login.html" style="float: right;"><img class="header_icon" src="../static/login.png" alt="HomeIcon" /></a>`;
}
document.write(real_header);