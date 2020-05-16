let currentValue = '';
let adding = document.querySelector(".adding");
let dirname = document.querySelector(".adddir");

dirname.disabled = true;
dirname.style.opacity = '0.6';
document.querySelector(".hand").style.display = "none";

function radioChange(myRadio) {
    if(myRadio.value == 'directory') {
        adding.parentNode.style['pointer-events'] = 'none';
        adding.style.backgroundColor = '#aaa';
        dirname.disabled = false;
        dirname.style.opacity = '0.93';
        document.querySelector(".addfilebut").style.display = "none";
        document.querySelector(".hand").style.display = "block";
    } else {
        adding.parentNode.style['pointer-events'] = 'auto';
        adding.style.backgroundColor = '#505050';
        dirname.disabled = true;
        dirname.style.opacity = '0.6';
        document.querySelector(".addfilebut").style.display = "block";
        document.querySelector(".hand").style.display = "none";
    }
}

