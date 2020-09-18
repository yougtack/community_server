function insert(type, title, content, userId) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    const data = {
        b_type: type.value,
        b_title: title.value,
        b_content: content.value,
        userId: userId
    };

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));

    location.href = `community.html?b_type=${data.b_type}`;

}

// function imgInsert(fileN) {
//     let xhttp = new XMLHttpRequest();
//     const url = "http://localhost:8080";
//     const userId = JSON.stringify(document.cookie.substr(7,));
//
//     xhttp.open("POST", url + `/board/upload`, false);
//
//     xhttp.onreadystatechange = () => {
//
//         if (xhttp.status !== 200) {
//             console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
//         }
//     };
//
//     xhttp.setRequestHeader("Content-Type", "application/json");
//     xhttp.send(fileN.files[0].name);
//     console.log(data);
// }

function valueCheck() {
    const title = document.getElementById("title"),
        type = document.getElementById("type"),
        content = document.getElementById("content"),
        fileN = document.getElementById("fileN");

    if (document.cookie.substr(7,).value === undefined) {
        alert("로그인이 필요합니다.");
        return false;
    } else if (title.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        title.focus();
        return false;
    } else if (type.value.trim().length <= 0) {
        alert("타입을 선택해주세요.");
        type.focus();
        return false;
    } else if (content.value.trim().length <= 0) {
        alert("내용을 작성해주세요.");
        content.focus();
        return false;
    }

    insert(type, title, content, userId);
    // imgInsert(fileN);

}