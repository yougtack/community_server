const community = {
    data: []
};
const b_id = location.search.substr(location.search.indexOf("=") + 1);

function printCommunity() {
    const type_text = document.querySelector(".type_text");

    if (community.data.b_type === "1") {
        type_text.innerText = "자유게시판";
    } else if (community.data.b_type  === "2") {
        type_text.innerText = "게임게시판";
    } else if (community.data.b_type  === "3") {
        type_text.innerText = "사진게시판";
    } else {
        type_text.innerText = "영상게시판";
    }

    let real_div = `<div class="user_community">`;
    real_div += `<p class="user_community_title">${community.data.b_title}</p>`;
    real_div += `<br>`;
    real_div += `<span class="txt">${community.data.userId}</span>`;
    real_div += `<span class="txt">${community.data.b_date}</span>`;
    real_div += `<span class="txt end_txt">${community.data.b_count}</span></div>`;
    real_div += `<div class="user_content">${community.data.b_content}</div>`;
    real_div += `<br><br><hr>`;
    real_div += `<a href="community.html?b_type=${community.data.b_type}"><input type="button" value="목록" style="float: right; width: 80px; height: 70px" /></a>`;
    document.write(real_div);

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

    xhttp.send();

    printCommunity();

})();

