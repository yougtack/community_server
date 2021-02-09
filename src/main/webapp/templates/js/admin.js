const USER_LIST = {
    data: []
}

function deleteUser(delete_user_id) {
    if (confirm("해당유저를 삭제시키겠습니까?")) {
        const DELETE_USER = {
            userId: delete_user_id
        };

        let xhttp = new XMLHttpRequest();
        const url = "http://3.133.28.138:8080";

        xhttp.open("DELETE", url + `/member`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("유저 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                alert("삭제하였습니다.");
                location.href = "admin.html";
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(DELETE_USER));
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + "/member/memberList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            USER_LIST.data = array;
        }
    };

    xhttp.send();
})();

(function printUser() {
    let real_table;
    real_table =
        `<p style="font-size: 24px; margin: 60px 0 0 0;">유저명단</p>` +
        `<br>` +
        `<div style="margin: 30px 0 0 70px;">`;
    for (let index of USER_LIST.data) {
        if(index.userId !== "admin") {
            real_table +=
                    `<div class="admin_div">` +
                        `<span class="admin_btn">` +
                            `<img 
                                class="admin_del" 
                                src="../static/delete.png"
                                alt="icon"
                                onclick="deleteUser('${index.userId}')"
                             />` +
                        `</span>` +
                        `<img class="admin_img" src="${index.file_path}" alt="profile" />` +
                        `<br>` +
                        `<span>` +
                            `<strong>USER_ID</strong> : ${index.userId}` +
                        `</span>` +
                    `</div>`;
        }
    }
    real_table +=
        `</div>`;

    document.write(real_table);
})();