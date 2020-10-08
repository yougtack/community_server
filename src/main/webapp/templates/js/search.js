const searchList = {
    data: []
};

const word = location.search.substr(location.search.indexOf("=") + 1);

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/search?word=${word}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            searchList.data = array;
        }
    };

    xhttp.send();

    document.getElementById("search_word").value = decodeURI(word);
})();

(function printCommunity() {
    const txt = document.querySelector(".txt");
    let real_tr;
    real_tr =
        `<tr>` +
            `<td style="width: 5%;">번호</td>` +
            `<td style="width: 30%;">이름</td>` +
            `<td style="width: 35%;">날짜</td>` +
            `<td style="width: 25%;">작성자</td>` +
            `<td style="width: 5%;">조회수</td>` +
        `</tr>`;
    document.write(real_tr);

    txt.innerText = "검색결과";
    txt.innerHTML +=
        '<a href="../templates/insert.html" style="margin-left: 80%;"><img src="../static/create.png" alt="HomeIcon" /></a>';

    if(searchList.data.length === 0) {
        real_tr =
            "<div style='margin-top: 20px;'>검색하신 내용이 존재하지 않습니다.</div>";
        document.write(real_tr);
    }else {
        for (let index of searchList.data) {
            real_tr =
                `<tr>` +
                    `<td >${index.b_id}</td>` +
                    `<td><a class="community_a" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a></td>` +
                    `<td>${index.b_date}</td>` +
                    `<td>${index.userId}</td>` +
                    `<td>${index.b_count}</td>` +
                `</tr>`;
            document.write(real_tr);
        }
    }
})();