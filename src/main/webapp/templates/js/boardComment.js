(function loginCheck() {
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return false;
    }
})();

const BOARD_COMMENT = {
    data: []
};

const B_ID = location.search.substr(location.search.indexOf("=") + 1);

let oEditors = [];
nhn.husky.EZCreator.createInIFrame({
    oAppRef: oEditors,
    elPlaceHolder: "ir1",
    sSkinURI: "SmartEditor2Skin.html",
    htParams : {bUseToolbar : true,
        fOnBeforeUnload : function(){
            //alert("아싸!");
        }
    }, //boolean
    fOnAppLoad : function(){
        //예제 코드
        //oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
    },
    fCreator: "createSEditor2"
});

function boardCommentInsert(title,content) {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    const BOARD_COMMENT_DATA = {
        b_type: BOARD_COMMENT.data.b_type,
        b_title: title.value,
        b_content: content,
        userId: document.cookie.substr(7,),
        group_id: BOARD_COMMENT.data.group_id,
        parent_reply_id: BOARD_COMMENT.data.b_id,
        depth: BOARD_COMMENT.data.depth,
        order_no: BOARD_COMMENT.data.order_no
    }


    xhttp.open("POST", URL + `/board/community/second`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("답글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            location.href = `community.html?b_type=${BOARD_COMMENT_DATA.b_type}`;
        }
        BOARD_COMMENT.data = JSON.parse(xhttp.responseText);
    };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(BOARD_COMMENT_DATA));
}

function cancel() {
    if(confirm("답글 작성을 취소하시겠습니까?")) {
        location.href = `userCommunity.html?b_id=${B_ID}`;
    }
}

function valueCheck() {
    const TITLE = document.getElementById("title"),
        S_HTML = oEditors.getById["ir1"].getIR();

    if (TITLE.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        TITLE.focus();
        return false;
    } else if (document.getElementById("title").value.length > 20) {
        alert("글자 제한 수를 초과하였습니다.");
        TITLE.focus();
        return false;
    }

    boardCommentInsert(TITLE, S_HTML);
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const URL = "http://localhost:8080";

    xhttp.open("GET", URL + `/board/view/${B_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        BOARD_COMMENT.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();

    document.getElementById("title").value = BOARD_COMMENT.data.b_title;
})();

(function boardCommentLimit(){
    if (BOARD_COMMENT.data.depth === 5){
        alert("게시글의 답글은 최대 5번까지 가능합니다.");
        location.href = `userCommunity.html?b_id=${B_ID}`;
    }
})();