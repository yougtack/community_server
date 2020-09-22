const community = {
    data: []
};

function printCommunity() {
    const type = location.search.substr(location.search.indexOf("=") + 1);
    const type_text = document.querySelector(".type_text");
    let real_tr;
    real_tr = `<tr class="community_table">`;
    real_tr += `<td class="b_id">번호</td>`;
    real_tr += `<td class="b_title">이름</td>`;
    real_tr += `<td class="b_date">날짜</td>`;
    real_tr += `<td class="userId">작성자</td>`;
    real_tr += `<td class="b_count">조회수</td>`;
    real_tr += `</tr>`;
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

    for (let index of community.data) {
        if (type === index.b_type) {
            real_tr = `<tr>`;
            real_tr += `<td >${index.b_id}</td>`;
            real_tr += `<td><a class="community_a" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a></td>`;
            real_tr += `<td>${index.b_date}</td>`;
            real_tr += `<td>${index.userId}</td>`;
            real_tr += `<td>${index.b_count}</td>`;
            real_tr += `</tr>`;
            document.write(real_tr);
        }
    }
}

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

    printCommunity();
})();

