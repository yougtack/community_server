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
    console.log(community.data);
    const b = new Date(community.data[0].b_date).toString();
    console.log(community.data[0].b_date);
    console.log(b);
})();

(function printCommunity() {
    const type = location.search.substr(location.search.indexOf("=") + 1);
    const txt = document.querySelector(".txt");
    let real_body = '';

    if (type === "1") {
        txt.innerText = "자유게시판";
    } else if (type === "2") {
        txt.innerText = "게임게시판";
    } else if (type === "3") {
        txt.innerText = "음식게시판";
    } else {
        txt.innerText = "코딩게시판";
    }
    txt.innerHTML += `<a href="../templates/insert.html?type=${type}" style="margin-left: 80%;"><img src="../static/create.png" alt="HomeIcon" /></a>`;

    for (let index of community.data) {
        let cnt = 0;
        if (type === index.b_type) {
            for (let count of index.comments) {
                ++cnt;
            }
            real_body +=
                `<div class="index_box" style="width: 90%">` +
                    '<div class="index_item">' +
                        `<span style="font-size: 14px;">#${index.b_id}</span>` +
                        '<br>' +
                        `<span class="index_title"><a href="userCommunity.html?b_id=${index.b_id}">${index.b_title}[${cnt}]</a></span>` +
                        `<span class="" style="float: right">${index.userId}</span>` +
                        `<span class="" style="float: right;">${index.b_date}</span>` +
                        `<span class=""><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${index.b_count}</span>` +
                    '</div>' +
                '</div>';

            document.write(real_body);
        }
    }
})();