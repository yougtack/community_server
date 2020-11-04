const INDEX_DATA = {
    rankData: [],
    data:[]
};

let c_length = 0;

(function rankInit() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/board/rank`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        INDEX_DATA.rankData = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
})();

(function indexInit() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + "/board/boardList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            INDEX_DATA.data = array;
        }
    };

    xhttp.send();
})();

function timeForToday(value) {
    const TODAY = new Date();
    const TIME_VALUE = new Date(value);

    // Math.floor는 소수점 이하를 버림.
    const BETWEEN_TIME = Math.floor((TODAY.getTime() - TIME_VALUE.getTime()) / 1000 / 60);
    if (BETWEEN_TIME < 1) {
        return '방금전';
    }
    if (BETWEEN_TIME < 60) {
        return `${BETWEEN_TIME}분전`;
    }

    const BETWEEN_TIME_HOUR = Math.floor(BETWEEN_TIME / 60);
    if (BETWEEN_TIME_HOUR < 24) {
        return `${BETWEEN_TIME_HOUR}시간전`;
    }

    const BETWEEN_TIME_DAY = Math.floor(BETWEEN_TIME / 60 / 24);
    if (BETWEEN_TIME_DAY < 365) {
        return `${BETWEEN_TIME_DAY}일전`;
    }

    return `${Math.floor(BETWEEN_TIME_DAY / 365)}년전`;
}

(function rankPrint() {
    let rank_length = 0;
    let rank_div =
            '<div style="width: 70%;">' +
                '<p class="txt">인기게시글</p>';
    for (let value of INDEX_DATA.rankData) {
        let time = value.b_date;
        if (rank_length >= 10) {
            break;
        } else {
            rank_div +=
                `<div class="index_box">` +
                    '<div class="index_item">' +
                        `<span>` +
                            `<a 
                                class="index_title" 
                                href="userCommunity.html?b_id=${value.b_id}">${value.b_title}
                             </a>` +
                            `<span class="cnt_size">[${value.commentCount}]</span>` +
                        `</span>` +
                        `<span>` +
                        `<span class="index_date">${timeForToday(time)}</span>` +
                        '<br>' +
                        `<span class="index_userId">${value.userId}</span>` +
                        `<span class="index_img">` +
                            `<img 
                                class="index_img_size" 
                                src="../static/eye.png" 
                                alt="eyeIcon" 
                             />${value.b_count}` +
                        `</span>` +
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
        for (let value of INDEX_DATA.data) {
            let time = value.b_date;
            if (value.b_type === "" + index_type) {
                if (c_length >= 5) {
                    break;
                } else {
                    if (value.depth === 0) {
                        index_div +=
                            `<div class="index_box">` +
                                '<div class="index_item">' +
                                    `<span>` +
                                        `<a 
                                            class="index_title" 
                                            href="userCommunity.html?b_id=${value.b_id}">${value.b_title}
                                         </a>` +
                                    `<span class="cnt_size">[${value.commentCount}]</span>` +
                                    `<span>` +
                                    `<span class="index_date">${timeForToday(time)}</span>` +
                                    '<br>' +
                                    `<span class="index_userId">${value.userId}</span>` +
                                    `<span class="index_img">` +
                                        `<img 
                                            class="index_img_size" 
                                            src="../static/eye.png" 
                                            alt="eyeIcon"
                                         />${value.b_count}` +
                                    `</span>` +
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