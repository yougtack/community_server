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
    txt.innerHTML +=
        `<a href="../templates/insert.html?type=${type}" style="margin-left: 80%;">` +
            `<img src="../static/create.png" alt="HomeIcon" />` +
        `</a>`;


    for (let index of community.data) {
        const time = new Date(index.b_date * 1000);
        if(index.b_id === index.b_recomment_id) {
            if (type === index.b_type) {
                real_body +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                        `<span class="b_id_size">#${index.b_id}</span>` +
                        `<span class="community_info">${index.userId}</span>` +
                        '<br>' +
                        `<span>` +
                            `<a class="index_title" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>` +
                        `<span class="cnt_size">[${index.commentCount}]</span>` +
                        `</span>` +
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
        }else {
            if (type === index.b_type) {
                real_body +=
                    `<div class="board_comments_box" style="display: inline-block;">` +
                        '<div class="board_comment_item">' +
                            `<img class="board_arrow" src="../static/arrows.png" alt="img"/>` +
                            `<span class="b_id_size">#${index.b_id}</span>` +
                            `<span class="community_info">${index.userId}</span>` +
                            '<br>' +
                            `<span>` +
                                `<a class="index_title board_comment_title" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>` +
                            `<span class="cnt_size">[${index.commentCount}]</span>` +
                            `</span>` +
                            `<span class="community_info" style="font-size: 12px;">` +
                                `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ` +
                                `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:` +
                                `${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:` +
                                `${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}` +
                            `</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${index.b_count}</span>` +
                        '</div>' +
                    '</div>' +
                    '<br>';
            }
        }
    }
    document.write(real_body);
})();