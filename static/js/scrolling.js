window.onscroll = function() {scrollButStick()};

let header = document.querySelector(".header");
let sticky = header.offsetTop;

function scrollButStick() {
    if(window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}