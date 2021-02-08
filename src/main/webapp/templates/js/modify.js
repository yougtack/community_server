const COMMUNITY = {
    data: [],
    image: []
};

const USER_ID = document.cookie.substr(7,);
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

function communityModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";
    let sHTML = oEditors.getById["ir1"].getIR();

    if (confirm("게시글을 수정합니다.")) {
         if (document.getElementById("title").value.trim().length <= 0) {
            alert("제목을 작성해주세요.");
            document.getElementById("title").focus();
            return false;
        } else if (document.getElementById("title").value.length > 20) {
            alert("글자 제한 수를 초과하였습니다.");
            document.getElementById("title").focus();
            return false;
        }

        const MODIFY_DATA = {
            userId: USER_ID,
            b_id: B_ID,
            b_type: COMMUNITY.data.b_type,
            b_title: document.getElementById("title").value,
            b_content: sHTML
        };

        xhttp.open("PUT", URL + `/board/community/${B_ID}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
            } else {
                location.href = `userCommunity.html?b_id=${B_ID}`;
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(MODIFY_DATA));
    }
}

function cancel() {
    if (confirm("수정을 취소하겠습니까?")) {
        location.href = `userCommunity.html?b_id=${B_ID}`;
    }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://3.133.28.138:8080";

    xhttp.open("GET", URL + `/board/view/${B_ID}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        COMMUNITY.data  = JSON.parse(xhttp.responseText);
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    document.getElementById("title").value = COMMUNITY.data.b_title;
    document.getElementById("ir1").value = COMMUNITY.data.b_content;
})();