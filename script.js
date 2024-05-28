console.log("Just for testing");
const displaySidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".navbar");
const viewSidebar = document.querySelector(".navbar li:nth-child(8)");

const showSidebar = () => {
  displaySidebar.style.transform = "translateX(0px)";
  navbar.style.justifyContent = "space-between";
  navbar.style.padding = "20px 10px";
  viewSidebar.style.display = "none";
};

const hideSidebar = () => {
  displaySidebar.style.transform = "translateX(300px)";
  navbar.style.justifyContent = "space-around";
  navbar.style.padding = "20px";
  viewSidebar.style.display = "block";
};

// Select all the links
const navLinks = document.querySelectorAll(".navLinks li a");

// Function to remove 'active' class from all links and add to the clicked one
function handleNavLinkClick(event) {
  navLinks.forEach((link) => link.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

// Add event listeners to all links
navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});
