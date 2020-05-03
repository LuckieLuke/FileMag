window.onscroll = function() {scrollButStick()};

var header = document.querySelector(".header");
var sticky = header.offsetTop;

function scrollButStick() {
    if(window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}