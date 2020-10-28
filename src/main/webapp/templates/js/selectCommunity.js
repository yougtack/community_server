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
        const time = new Date(index.b_date);
            if (type === index.b_type) {
                real_body +=
                    `<div class="index_box">`;
                if(index.depth > 0) {
                    real_body +=
                        '<div class="board_comment_item">';
                } else {
                    real_body +=
                        '<div class="index_item">';
                }
                if (index.depth > 1){
                    for(let i = 1; i < index.depth; i++){
                        real_body +=
                            `<img class="board_arrow" src="../static/arrows.png" style="visibility: hidden;" alt="img"/>`;
                    }
                    real_body +=
                        `<img class="board_arrow" src="../static/arrows.png" alt="img"/>`;

                } else if (index.depth === 1) {
                    real_body +=
                        `<img class="board_arrow" src="../static/arrows.png" alt="img"/>`;
                }
                console.log(index);
                real_body +=
                        `<span class="b_id_size">#${index.b_id} `;
                if(index.updateCheck > 0) {
                    real_body +=
                        '<span class="update_check">(수정됨)</span>';
                }
                real_body +=
                        `</span>` +
                        `<span class="community_info">${index.userId}</span>` +
                        '<br>' ;
                if (index.depth > 0){
                    let margin_left_value = 30 * index.depth;
                    real_body +=
                        `<span>` +
                            `<a class="index_title" style="margin: 0 0 0 ${margin_left_value}px;" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>`;
                } else {
                    real_body +=
                        `<span>` +
                            `<a class="index_title" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>`;
                }
                real_body +=
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
    }
    document.write(real_body);
})();