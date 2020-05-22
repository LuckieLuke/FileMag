function filterContent() {
    search = document.querySelector(".search-input").value;
    let url = window.location.href;
    let path = url.split("/");


    i = 0;
    while(path[i] != "dir" || path[i] == "filter"){
        i++;
    }
    if(path[i] == "filter") {
        i++;
    }

    path.splice(0, i+1);
    path = path.join("/");
    path = "/filter/" + search + "/" + path;
    window.location.href = path;
}