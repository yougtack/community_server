const community = {
    data: [],
    image: []
};

const userId = document.cookie.substr(7,);
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

function imgDelete(i_id) {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("DELETE", url + `/board/${i_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send();
    image();
}

function imgInsert() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const img = document.getElementById("files");
    let files = img;
    let formData = new FormData();

    for (let value of files.files){
        formData.append('Files', value);
    }

    xhttp.open("POST", url + `/board/upload/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

function communityModify() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    let sHTML = oEditors.getById["ir1"].getIR();

    const files = document.getElementById("files").value;
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

        const modifyData = {
            userId: userId,
            b_id: b_id,
            b_type: community.data.b_type,
            b_title: document.getElementById("title").value,
            b_content: sHTML
        };

        xhttp.open("PUT", url + `/board/community/${b_id}`, false);

        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
                alert("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(modifyData));

        if (files !== "") {
            imgInsert();
        }

        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function cancel() {
    if (confirm("수정을 취소하겠습니까?")) {
        location.href = `userCommunity.html?b_id=${b_id}`;
    }
}

function image() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    let real_delBtn = document.getElementById("delBtn");
    real_delBtn.innerHTML = "";

    xhttp.open("GET", url + `/board/getImage/${b_id}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        community.image = JSON.parse(xhttp.response);
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    if (community.image.length > 0) {
        for (let index of community.image) {
            real_delBtn.innerHTML +=
                `${index.fileName}<img src="../static/delete.png" alt="delIcon" style="width: 20px; height: 20px;" onclick="imgDelete(${index.i_id})" />`;
        }
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

        const array = JSON.parse(xhttp.responseText);

        community.data = array;
    };

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    image();

    document.getElementById("title").value = community.data.b_title;
    document.getElementById("ir1").value = community.data.b_content;
})();