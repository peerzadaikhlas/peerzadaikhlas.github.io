// Toggle menu icon and show/hide the navigation links for mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Change hamburger icon to 'X'
    navbar.classList.toggle('active'); // Show/hide the menu
};

// Scroll Spy: Highlight the current section in the navigation
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset to start highlighting before the section hits the top
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                // Find the matching navigation link and set it to active
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Header
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click on a link (for mobile)
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};
