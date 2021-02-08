const COMMUNITY = {
    data: []
};

(function init() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + "/board/boardList", false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            COMMUNITY.data = array;
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

(function printCommunity() {
    const TYPE = location.search.substr(location.search.indexOf("=") + 1);
    const TXT = document.querySelector(".txt");
    let real_body = '';

    if (TYPE === "1") {
        TXT.innerText = "자유게시판";
    } else if (TYPE === "2") {
        TXT.innerText = "게임게시판";
    } else if (TYPE === "3") {
        TXT.innerText = "음식게시판";
    } else {
        TXT.innerText = "코딩게시판";
    }
    TXT.innerHTML +=
        `<a href="../templates/insert.html?type=${TYPE}" style="margin-left: 80%;">` +
            `<img src="../static/create.png" alt="HomeIcon" />` +
        `</a>`;


    for (let index of COMMUNITY.data) {
        const TIME = index.b_date;
            if (TYPE === index.b_type) {
                real_body +=
                    `<div class="index_box">`;
                if(index.depth > 0) {
                    real_body +=
                        '<div class="board_comment_item">';
                } else {
                    real_body +=
                        '<div class="index_item">';
                }

                // 답글일 때 arrow 아이콘 출력
                if (index.depth > 1){
                    for(let i = 1; i < index.depth; i++){
                        real_body +=
                            `<img 
                                class="board_arrow" 
                                src="../static/arrows.png" 
                                style="visibility: hidden;"
                                 alt="img"
                             />`;
                    }
                    real_body +=
                        `<img class="board_arrow" src="../static/arrows.png" alt="img"/>`;

                } else if (index.depth === 1) {
                    real_body +=
                        `<img class="board_arrow" src="../static/arrows.png" alt="img"/>`;
                }

                real_body +=
                        `<span class="b_id_size">#${index.b_id} `;

                // 수정되면 (수정됨) 출력
                if(index.updateCheck > 0) {
                    real_body +=
                        '<span class="update_check">(수정됨)</span>';
                }

                real_body +=
                        `</span>` +
                        `<span class="community_info">${index.userId}</span>` +
                        '<br>' ;

                // 답글일 때 제목 margin값 넣기
                if (index.depth > 0){
                    let margin_left_value = 30 * index.depth;
                    real_body +=
                        `<span>` +
                            `<a class="index_title" 
                                style="margin: 0 0 0 ${margin_left_value}px;" 
                                href="userCommunity.html?b_id=${index.b_id}">
                                ${index.b_title}
                             </a>`;
                } else {
                    real_body +=
                        `<span>` +
                            `<a class="index_title" href="userCommunity.html?b_id=${index.b_id}">${index.b_title}</a>`;
                }

                real_body +=
                            `<span class="cnt_size">[${index.commentCount}]</span>` +
                        `</span>` +
                        `<span class="community_info" style="font-size: 12px;">` +
                            `${timeForToday(TIME)}` +
                        `</span>` +
                        `<span class="index_img">` +
                            `<img class="index_img_size" src="../static/eye.png" alt="eyeIcon" />${index.b_count} ` +
                        `</span>` ;
                if(index.imageCount > 0) {
                    real_body +=
                        `<img class="index_img_size" src="../static/image.png" alt="image" />`;
                }
                real_body +=
                        '</div>' +
                    '</div>';
            }
    }
    document.write(real_body);
})();