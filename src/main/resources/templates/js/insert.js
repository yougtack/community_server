function insert(type,title,content) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    const data = {
        b_type: type.value,
        b_title: title.value,
        b_content: content.value,
        userId: "babo"
    };

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(data));
    console.log(data);
}

function valueCheck() {
    const title = document.getElementById("title"),
        type = document.getElementById("type"),
        content = document.getElementById("content");

    if (title.value.trim().length <= 0) {
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

    insert(type,title,content);

}