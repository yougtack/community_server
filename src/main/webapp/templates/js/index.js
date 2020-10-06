const rank = {
    data: []
};

(function init() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    xhttp.open("GET", url + `/board/rank`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }

        const array = JSON.parse(xhttp.responseText);

        rank.data = array;
    };

    xhttp.send();
})();

(function rankPrint() {
    let rank_div =
        '<table>' +
            '<tr>' +
                '<td style="width: 50px;">조회수</td>' +
                '<td style="width: 200px;">제목</td>' +
                '<td style="width: 100px;">날짜</td>' +
            '</tr>';
    for (let value of rank.data){
        let cnt = 0;
        for (let count of value.comments) {
            ++cnt;
        }
        rank_div +=
            `<tr>` +
                `<td>${value.b_count}</td>` +
                `<td><a href="userCommunity.html?b_id=${value.b_id}">${value.b_title}[${cnt}]</a></td>` +
                `<td>${value.b_date}</td>` +
            '</tr>';
    }

    rank_div += '</table>';

    document.write(rank_div);
})();