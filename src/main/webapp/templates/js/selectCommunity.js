const community = {
    data: []
};

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + "/board/boardList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            community.data = array;
        }
    };

    xhttp.send();
})();

(function printCommunity() {
    const type = location.search.substr(location.search.indexOf("=") + 1);
    const type_text = document.querySelector(".type_text");
    let real_tr = '';

    real_tr +=
        `<tr>` +
        `<td style="width: 5%;">번호</td>` +
        `<td style="width: 30%;">제목</td>` +
        `<td style="width: 35%;">날짜</td>` +
        `<td style="width: 25%;">작성자</td>` +
        `<td style="width: 5%;">조회수</td>` +
        `</tr>`;

    document.write(real_tr);

    if (type === "1") {
        type_text.innerText = "자유게시판";
    } else if (type === "2") {
        type_text.innerText = "게임게시판";
    } else if (type === "3") {
        type_text.innerText = "음식게시판";
    } else {
        type_text.innerText = "코딩게시판";
    }
    type_text.innerHTML += '<a href="../templates/insert.html" style="margin-left: 80%;"><img src="../static/create.png" alt="HomeIcon" /></a>';

    for (let index of community.data) {
        let cnt = 0;
        if (type === index.b_type) {
            real_tr =
                `<tr>` +
                `<td >${index.b_id}</td>`;
            for (let count of index.comments) {
                ++cnt;
            }
            real_tr +=
                `<td><a href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>[${cnt}]</td>` +
                `<td>${index.b_date}</td>` +
                `<td>${index.userId}</td>` +
                `<td>${index.b_count}</td>` +
                `</tr>`;
            document.write(real_tr);
        }
    }
})();