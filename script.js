```javascript
// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu when a page link is selected
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
            menuToggle.textContent = "☰";
        });
    });
}

// Automatically update the footer year
document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});
```