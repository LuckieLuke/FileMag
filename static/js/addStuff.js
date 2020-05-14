function addstuff() {
    let adding = document.querySelector("#check-file").checked;
    let url = window.location.href;
    let path = url.split("/");

    i = 0;
    while(path[i] != "add"){
        i++;
    }

    path.splice(0, i+1);
    path = path.join("/");

    console.log(adding);    
    console.log(path);

    if (!adding) {
        let name = document.querySelector(".adddir").value;
        console.log(name);

        if (name == "") {
            alert("You must name the directory!");
            window.location.href = "/add/" + path;
        } else {
            path = "/addconf/dir/" + path + "/" + name;
            console.log(path);
            window.location.href = path;
        }
    } else {
        let name = document.querySelector(".addfile").files;
        console.log(name);
    }
}