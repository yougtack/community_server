const community = {
    data: []
};

function printCommunity() {
    console.log(community);
    const body = document.querySelector("body");
    const real_h1 = document.getElementById("hi");

    // real_h1.innerText = `${community.data[0].b_title}`;

}

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";
    xhttp.open("GET", url + "/board/getTest",false);

    xhttp.onreadystatechange  = () => {
        
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

