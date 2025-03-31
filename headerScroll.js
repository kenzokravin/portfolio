let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scrolling down
        header.classList.add("hidden-header");
    } else {
        // Scrolling up
        header.classList.remove("hidden-header");
    }
    lastScrollTop = scrollTop;
});