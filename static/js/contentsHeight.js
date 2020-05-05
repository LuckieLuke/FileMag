const setContentsSizes = () => {
    const windowHeight = window.innerHeight;
    const navHeight = document.querySelector(".nav").offsetHeight;
    const headerHeight = document.querySelector(".header").offsetHeight;

    const newHeight = (windowHeight-navHeight-headerHeight) + "px";
    const newFileHeight = (windowHeight-navHeight-headerHeight)/9 + "px";

    document.querySelector(".contents").style.height = newHeight;    
    
    let files = document.querySelectorAll(".file");

    for (let file of files) {
        file.style.height = newFileHeight;
    }
};

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

if (!isMobileDevice()) {
    window.addEventListener("resize", () => {
        setContentsSizes();
    })
}

setContentsSizes();