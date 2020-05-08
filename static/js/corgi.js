const corgiPNG = document.querySelector(".corgi");

const corgiClick = (() => { 
    const h = window.innerHeight;
    const w = window.innerWidth;

    let link = "http://placecorgi.com/" + w + "/" + h;
    console.log(link);

    window.location.href = link;
});
