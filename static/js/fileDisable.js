let currentValue = '';
let adding = document.querySelector(".adding");
let dirname = document.querySelector(".adddir");

dirname.disabled = true;
dirname.style.opacity = '0.6';

function radioChange(myRadio) {
    if(myRadio.value == 'directory') {
        adding.parentNode.style['pointer-events'] = 'none';
        adding.style.backgroundColor = '#aaa';
        dirname.disabled = false;
        dirname.style.opacity = '0.93';
    } else {
        adding.parentNode.style['pointer-events'] = 'auto';
        adding.style.backgroundColor = '#505050';
        dirname.disabled = true;
        dirname.style.opacity = '0.6';
    }
}