function toggleNav() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('nav-active');

    var burgerLines = document.querySelectorAll('.burger div');
    burgerLines.forEach((line, index) => {
        line.classList.toggle(`line${index + 1}-active`);
    });
}

// Function to toggle the sub-menu visibility
function toggleSubMenu() {
    var subMenu = document.querySelector('.nav-links > li > .sub-menu');
    subMenu.classList.toggle('show');
}

// Event listener to toggle sub-menu visibility
document.querySelector('.nav-links > li > a[href="#appointments"]').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    toggleSubMenu();
});
