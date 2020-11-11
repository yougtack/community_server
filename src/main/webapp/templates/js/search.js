const SEARCH_LIST = {
    data: []
};

const WORD = location.search.substr(location.search.indexOf("=") + 1);

(function init() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/board/search/${WORD}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const ARRAY = JSON.parse(xhttp.responseText);

        for (let index of ARRAY) {
            SEARCH_LIST.data = ARRAY;
        }
    };

    xhttp.send();

    document.getElementById("search_word").value = decodeURI(WORD);
})();

function searchEnter() {
    if (window.event.keyCode === 13) {
        search();
    }
}

(function printCommunity() {
    const TXT = document.querySelector(".txt");
    let real_body = '';

    TXT.innerText = "검색결과";
    TXT.innerHTML +=
        '<a href="../templates/insert.html" style="margin-left: 80%;">' +
            '<img src="../static/edit.png" alt="HomeIcon" />' +
        '</a>';

    if(SEARCH_LIST.data.length === 0) {
        real_body =
            "<div style='margin-top: 20px;'>검색하신 내용이 존재하지 않습니다.</div>";
        document.write(real_body);
    }else {
        for (let index of SEARCH_LIST.data) {
            const time = new Date(index.b_date * 1000);
                real_body +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span style="font-size: 14px;">#${index.b_id}</span>` +
                            `<span class="community_info">${index.userId}</span>` +
                            '<br>' +
                            `<span>` +
                                `<a class="index_title" href="userCommunity.html?b_id=${index.b_id}">
                                    ${index.b_title}
                                    </a>` +
                                `<span class="cnt_size">[${index.commentCount}]</span>` +
                            `</span>` +
                            `<span class="community_info" style="font-size: 12px;">` +
                                `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                                `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                                `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                                `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                            `</span>` +
                            `<span class="index_img">` +
                                `<img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${index.b_count} ` +
                            `</span>`;
            if(index.imageCount > 0) {
                real_body +=
                    `<img class="index_img_size" src="../static/image.png" alt="image" />`;
            }
            real_body +=
                        '</div>' +
                    '</div>';
            }
        document.write(real_body);
        }
})();