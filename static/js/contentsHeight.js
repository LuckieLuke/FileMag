const setContentsSizes = () => {
    const windowHeight = window.innerHeight;
    const navHeight = document.querySelector(".nav").offsetHeight;
    const headerHeight = document.querySelector(".header").offsetHeight;

    const newHeight = (windowHeight-navHeight-headerHeight) + "px";
    const newFileHeight = (windowHeight-navHeight-headerHeight)/10 + "px";

    document.querySelector(".contents").style.height = newHeight;    
    
    let files = document.querySelectorAll(".file");

    for (let file of files) {
        file.style.height = newFileHeight;
    }
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
    window.addEventListener("resize", () => {
        setContentsSizes();
    })
}

setContentsSizes();