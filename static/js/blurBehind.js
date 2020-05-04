window.onscroll = function() { blurBehind() };





function blurBehind() {
    var files = document.querySelector(".dirr");
/*    for (let file of files) {
        var bottom = file.offsetTop + file.offsetHigh;
        if(bottom < 60) {
            file.style.filter = "blur(2px)";
        } else {
            file.style.filter = "blur(0px)";
        }
    }*/
    var top = files.offsetTop;
    console.log(files.scrollTop);
}