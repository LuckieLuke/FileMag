const searchInput = document.querySelector(".search-input");

searchInput.style.opacity = 0.6;
searchInput.style.transition = "opacity 0.5s";

const f_fade = (() => { searchInput.style.opacity = 0.6; });
const f_unfade = (() => { searchInput.style.opacity = 0.85 });

searchInput.addEventListener("focus", f_unfade, false);
searchInput.addEventListener("blur", f_fade, false);

