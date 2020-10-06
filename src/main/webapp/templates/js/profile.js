const userId = document.cookie.substr(7,);

function profileChange() {
    let xhttp = new XMLHttpRequest();
    const url = "http://localhost:8080";

    const img = document.getElementById("user_profile");
    let files = img;
    let formData = new FormData();

    formData.append('profile', files.files[0]);

    xhttp.open("PUT", url + `/member/profile/${userId}`, false);

    xhttp.onreadystatechange = () => {
        if (xhttp.status !== 200) {
            console.log("HTTP ERROR", xhttp.status, xhttp.statusText);
        }
    };

    xhttp.send(formData);
}

(function init() {
    const user_profile = document.getElementById("user_profile_view");

    for (let profile of userInfo.data) {
        if(profile.userId === userId) {
            user_profile.innerHTML = `<img class="profile" src="data:image/jpg;base64, ${profile.profile}" alt="profile" />`;
        }
    }
})();