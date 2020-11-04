(function loginCheck() {
    if (document.cookie.substr(7,) === "") {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return false;
    }
})();

let oEditors = [];
nhn.husky.EZCreator.createInIFrame({
    oAppRef: oEditors,
    elPlaceHolder: "ir1",
    sSkinURI: "SmartEditor2Skin.html",
    htParams : {bUseToolbar : true,
        fOnBeforeUnload : function(){
            // alert("아싸!");
        }
    }, //boolean
    fOnAppLoad : function(){
        //예제 코드
        //oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
    },
    fCreator: "createSEditor2"
});

function insert(title, content) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const data = {
        b_type: location.search.substr(location.search.indexOf("=") + 1),
        b_title: title.value,
        b_content: content,
        userId: document.cookie.substr(7,)
    };

    xhttp.open("POST", url + `/board/community`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
            alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            location.href = `community.html?b_type=${data.b_type}`;
        }
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

function valueCheck() {
    const title = document.getElementById("title");

    oEditors.getById["ir1"].exec("UPDATE_CONTENTS_FIELD", []);
    const content = document.getElementById("ir1").value;

    if (title.value.trim().length <= 0) {
        alert("제목을 작성해주세요.");
        title.focus();
        return false;
    } else if ( content === "" || content === null || content === '&nbsp;' ||
                content === '<br>' || content=== '<br/>' || content === '<p>&nbsp;</p>') {
        alert("내용을 작성해주세요.");
        return false;
    } else if (document.getElementById("title").value.length > 20) {
        alert("글자 제한 수를 초과하였습니다.");
        title.focus();
        return false;
    }

    insert(title,content);
}