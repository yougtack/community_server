const community = {
    data: []
};

function printCommunity() {
    console.log(community.data[0].image);
    const body = document.querySelector("body");
    const type = location.search.substr(location.search.indexOf("=") + 1);
    const type_text = document.querySelector(".type_text");
    const img = new Image();
    img.src = community.data[0].image;
    img.className = "te";
    body.prepend(img);


    // if(type === "1"){
    //     type_text.innerText = "자유게시판";
    // } else if(type === "2"){
    //     type_text.innerText = "게임게시판";
    // } else if(type === "3"){
    //     type_text.innerText = "사진게시판";
    // } else {
    //     type_text.innerText = "영상게시판";
    // }
    // for (let index of community.data) {
    //     console.log(index);
    //     if (type === index.b_type) {
    //         let real_tr = `<tr>`;
    //         real_tr += `<td class="b_id">${index.b_id}</td>`;
    //         real_tr += `<td class="b_title">${index.b_title}</td>`;
    //         real_tr += `<td class="b_date">${index.b_date}</td>`;
    //         real_tr += `<td class="userId">${index.userId}</td>`;
    //         real_tr += `<td class="b_count">${index.b_count}</td>`;
    //         real_tr += `</tr>`;
    //         document.write(real_tr);
    //     }
    // }
}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + "/board/getTest", false);

    xhttp.onreadystatechange = () => {

        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        for (let index of array) {
            community.data = array;
        }

    };

    xhttp.send();

    printCommunity();

})();

