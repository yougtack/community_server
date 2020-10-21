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
    console.log(userInfoProfile.boardData);
})();

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
    console.log("comment : ", userInfoProfile.commentData);
})();

(function info() {
    const user_profile = document.getElementById("user_profile_view");

    for (let profile of userInfo.data) {
        if(profile.userId === userId) {
            user_profile.innerHTML =
                `<img style="width: 150px; height: 150px; border-radius: 80px; border:1px solid #ddd;" src="data:image/jpg;base64, ${profile.profile}" alt="profile" />`;
        }
    }

    let tt = document.getElementById("tt");

    for (let value of userInfoProfile.boardData) {
        tt.innerHTML +=
            `<p style="border: 1px solid black;">${value.b_title}</p>`;
    }
})();