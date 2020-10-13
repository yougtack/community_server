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
    let real_body = '';

    txt.innerText = "검색결과";
    txt.innerHTML +=
        '<a href="../templates/insert.html" style="margin-left: 80%;"><img src="../static/create.png" alt="HomeIcon" /></a>';

    if(searchList.data.length === 0) {
        real_body =
            "<div style='margin-top: 20px;'>검색하신 내용이 존재하지 않습니다.</div>";
        document.write(real_body);
    }else {
        for (let index of searchList.data) {
            let cnt = 0;
            const time = new Date(index.b_date * 1000);
                for (let count of index.comments) {
                    ++cnt;
                }
                real_body +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span style="font-size: 14px;">#${index.b_id}</span>` +
                            `<span class="community_info">${index.userId}</span>` +
                            '<br>' +
                            `<span><a class="index_title" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a><span class="cnt_size">[${cnt}]</span></span>` +
                            `<span class="community_info" style="font-size: 12px;">` +
                                `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                                `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                                `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                                `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                            `</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${index.b_count}</span>` +
                        '</div>' +
                    '</div>';
            }
        document.write(real_body);
        }
})();