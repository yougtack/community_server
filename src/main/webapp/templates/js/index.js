const indexData = {
    rankData: [],
    data:[]
};

let c_length = 0;

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/rank`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        indexData.rankData = array;
    };

    xhttp.send();
})();

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
            indexData.data = array;
        }
    };

    xhttp.send();
})();

(function rankPrint() {
    let rank_length = 0;
    let rank_div =
            '<div style="width: 70%;">' +
                '<p class="txt">인기게시글</p>';
    for (let value of indexData.rankData) {
        if (rank_length >= 10) {
            break;
        } else {
            let cnt = 0;
            for (let count of value.comments) {
                ++cnt;
            }
            rank_div +=
                `<div class="index_box">` +
                    '<div class="index_item">' +
                        `<span class="index_title"><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></span>` +
                        `<span class="index_date">${value.b_date}</span>` +
                        '<br>' +
                        `<span class="index_userId">${value.userId}</span>` +
                        `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                    '</div>' +
                '</div>';
        }
        ++rank_length;
    }
    rank_div += '</div>';

    document.write(rank_div);
})();

(function freePrint() {
    let free_div =
        '<div class="index_div">' +
            '<p class="txt">자유게시판</p>';
    for (let value of indexData.data) {
        if(value.b_type === "1") {
            if (c_length >= 5) {
                break;
            } else {
                let cnt = 0;
                for (let count of value.comments) {
                    ++cnt;
                }
                free_div +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span class="index_title"><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></span>` +
                            `<span class="index_date">${value.b_date}</span>` +
                            '<br>' +
                            `<span class="index_userId">${value.userId}</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                        '</div>' +
                    '</div>';
            }
            ++c_length;
        }
    }
    free_div += '</div>';

    c_length = 0;
    document.write(free_div);
})();

(function gamePrint() {
    let game_div =
        '<div class="index_div">' +
            '<p class="txt">게임게시판</p>';
    for (let value of indexData.data) {
        if(value.b_type === "2") {
            if (c_length >= 5) {
                break;
            } else {
                let cnt = 0;
                for (let count of value.comments) {
                    ++cnt;
                }
                game_div +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span class="index_title"><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></span>` +
                            `<span class="index_date">${value.b_date}</span>` +
                            '<br>' +
                            `<span class="index_userId">${value.userId}</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                        '</div>' +
                    '</div>';
            }
            ++c_length;
        }
    }
    game_div += '</div>';

    c_length = 0;
    document.write(game_div);
})();

(function foodPrint() {
    let food_div =
        '<div class="index_div">' +
            '<p class="txt">음식게시판</p>';
    for (let value of indexData.data) {
        if(value.b_type === "3") {
            if (c_length >= 5) {
                break;
            } else {
                let cnt = 0;
                for (let count of value.comments) {
                    ++cnt;
                }
                food_div +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span class="index_title"><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></span>` +
                            `<span class="index_date">${value.b_date}</span>` +
                            '<br>' +
                            `<span class="index_userId">${value.userId}</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                        '</div>' +
                    '</div>';
            }
            ++c_length;
        }
    }
    food_div += '</div>';

    c_length = 0;
    document.write(food_div);
})();

(function codingPrint() {
    let coding_div =
        '<div class="index_div">' +
            '<p class="txt">코딩게시판</p>';
    for (let value of indexData.data) {
        if(value.b_type === "4") {
            if (c_length >= 5) {
                break;
            } else {
                let cnt = 0;
                for (let count of value.comments) {
                    ++cnt;
                }
                coding_div +=
                    `<div class="index_box">` +
                        '<div class="index_item">' +
                            `<span class="index_title"><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></span>` +
                            `<span class="index_date">${value.b_date}</span>` +
                            '<br>' +
                            `<span class="index_userId">${value.userId}</span>` +
                            `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                        '</div>' +
                    '</div>';
            }
            ++c_length;
        }
    }
    coding_div += '</div>';

    c_length = 0;
    document.write(coding_div);
})();