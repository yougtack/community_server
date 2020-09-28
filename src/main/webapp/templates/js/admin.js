function deleteUser(userId) {
    if (confirm("해당유저를 삭제시키겠습니까?")) {
        const deleteUser = {
            userId: userId
        };

        let xhttp = new XMLHttpRequest();
        const url = "http://localhost:8080";

        xhttp.open("DELETE", url + `/member`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(deleteUser));

        alert("삭제하였습니다.");
        location.href = "admin.html";
    }
}

function printUser() {
    let real_table;
    real_table = `<p style="font-size: 24px; margin: 60px 0 0 0;">유저명단</p>`;
    real_table += `<br>`;
    real_table += `<table style="margin: auto;">`;
    real_table += `<tr>`;
    real_table += `<td style="width: 20%">등급</td>`;
    real_table += `<td style="width: 20%">userId</td>`;
    real_table += `<td style="width: 20%">userPw</td>`;
    real_table += `<td style="width: 10%">삭제</td>`;
    real_table += `</tr>`;
    for (let index of userInfo.data) {
        if (index.userId === "admin") {
            continue;
        }
        real_table += `<tr>`;
        if (index.count >= 30) {
            real_table += `<td>나무 등급</td>`;
        } else if (index.count >= 20) {
            real_table += `<td>가지 등급</td>`;
        } else if (index.count >= 10) {
            real_table += `<td>새싹 등급</td>`;
        } else if (index.count >= 0) {
            real_table += `<td>씨앗 등급</td>`;
        }
        real_table += `<td>${index.userId}</td>`;
        real_table += `<td>${index.userPw}</td>`;
        real_table += `<td><img style="width: 20px; height: 20px;" src="../static/x.png" alt="icon" onclick="deleteUser('${index.userId}')"/></td>`;
        real_table += `</tr>`;
    }
    real_table += `</table>`;

    document.write(real_table);
}

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

    printUser();
})();