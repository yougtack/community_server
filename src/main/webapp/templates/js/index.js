const indexData = {
    rankData: [],
    data:[]
};

let c_length = 0;

(function rank_init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/rank`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        indexData.rankData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function index_init() {
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

function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    // Math.floor는 소수점 이하를 버림.
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) {
        return '방금전';
    }
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}

(function rankPrint() {
    let rank_length = 0;
    let rank_div =
            '<div style="width: 70%;">' +
                '<p class="txt">인기게시글</p>';
    for (let value of indexData.rankData) {
        let time = value.b_date * 1000;
        if (rank_length >= 10) {
            break;
        } else {
            rank_div +=
                `<div class="index_box">` +
                    '<div class="index_item">' +
                        `<span>` +
                            `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
                            `<span class="cnt_size">[${value.commentCount}]</span>` +
                        `</span>` +
                        `<span>` +`<span class="index_date">${timeForToday(time)}</span>` +
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

(function indexPrint() {
    for(let index_type = 1; index_type <= 4; index_type++ ){
        let index_div =
            '<div class="index_div">';
        if (index_type === 1) {
            index_div += '<p class="txt">자유게시판</p>';
        } else if (index_type === 2) {
            index_div += '<p class="txt">게임게시판</p>';
        } else if (index_type === 3) {
            index_div += '<p class="txt">음식게시판</p>';
        } else {
            index_div += '<p class="txt">코딩게시판</p>';
        }
        for (let value of indexData.data) {
            let time = value.b_date * 1000;
            if (value.b_type === "" + index_type) {
                if (c_length >= 5) {
                    break;
                } else {
                    if (value.b_id === value.b_recomment_id) {
                        index_div +=
                            `<div class="index_box">` +
                                '<div class="index_item">' +
                                    `<span>` +
                                        `<a class="index_title" href="userCommunity.html?b_id=${value.b_id}">${value.b_title}</a>` +
                                    `<span class="cnt_size">[${value.commentCount}]</span>` +
                                    `<span>` +`<span class="index_date">${timeForToday(time)}</span>` +
                                    '<br>' +
                                    `<span class="index_userId">${value.userId}</span>` +
                                    `<span class="index_img"><img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${value.b_count}</span>` +
                                '</div>' +
                            '</div>';
                        ++c_length;
                    }
                }
            }
        }
        index_div +=
            '</div>';

        c_length = 0;
        document.write(index_div);
    }
})();