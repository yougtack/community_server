function oo() {
    let xhttp = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://localhost:8080";
    xhttp.open("GET", "http://localhost:8080/board/community", true);

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState !== 4) {
            return;
        }

        if (xhttp.status === 200) {
            console.log(xhttp.responseText);
        } else {
            console.log("HTTP ERROR",xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send();

    console.log(xhttp);

}