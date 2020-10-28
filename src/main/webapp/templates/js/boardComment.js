const boardComment = {
    data: []
};

const b_id = location.search.substr(location.search.indexOf("=") + 1);

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

function imgInsert() {
    const img = document.getElementById("files");
    let files = img;
    let formData = new FormData();

    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    for (let value of files.files){
        formData.append('Files', value);
    }

    xhttp.open("POST", url + `/board/upload`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

function boardCommentInsert(title,content) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const boardCommentData = {
        b_type: boardComment.data.b_type,
        b_title: title.value,
        b_content: content,
        userId: document.cookie.substr(7,),
        group_id: boardComment.data.group_id,
        parent_reply_id: boardComment.data.b_id,
        depth: boardComment.data.depth,
        order_no: boardComment.data.order_no
    }


    xhttp.open("POST", url + `/board/community/second`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("답글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            location.href = `community.html?b_type=${boardCommentData.b_type}`;
        }
        boardComment.data = JSON.parse(xhttp.responseText);
    };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(boardCommentData));
}

function cancel() {
    if(confirm("답글 작성을 취소하시겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function valueCheck() {
    const title = document.getElementById("title"),
        sHTML = oEditors.getById["ir1"].getIR();

    if (title.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        title.focus();
        return false;
    } else if (document.getElementById("title").value.length > 20) {
        alert("글자 제한 수를 초과하였습니다.");
        title.focus();
        return false;
    }

    boardCommentInsert(title, sHTML);

    const img = document.getElementById("files");

    if (img !== "") {
        imgInsert();
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/view/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        boardComment.data = JSON.parse(xhttp.responseText);
    };

    xhttp.send();
    console.log(boardComment.data);

    document.getElementById("title").value = boardComment.data.b_title;
})();

(function boardCommentLimit(){
    if (boardComment.data.depth === 5){
        alert("게시글의 답글은 최대 5번까지 가능합니다.");
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
})();