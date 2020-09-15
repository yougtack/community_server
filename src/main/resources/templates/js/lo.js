const community = {
    data: []
};

function printCommunity() {
    const real_div = document.querySelector(".test"),
        real_h1 = real_div.querySelector("h1");

    real_h1.innerText = `${community.data[0].b_title}`;

}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("GET", url + "/board/boardList", false);

    xhttp.onload = () => {
        if (xhttp.readyState !== 4) {
            return;
        }

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

