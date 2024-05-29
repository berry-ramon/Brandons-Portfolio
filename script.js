console.log("Just for testing");
const displaySidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".navbar");
const iAm = document.querySelector(".left h2");
const viewSidebar = document.querySelector(".navbar li:nth-child(7)");

const showSidebar = () => {
  navbar.style.justifyContent = "space-between";
  navbar.style.padding = "20px 10px";
  viewSidebar.style.display = "none";
  displaySidebar.style.transition = "2s";
  displaySidebar.style.display = "block";
  iAm.style.fontSize = "15px";
  setTimeout(() => {
    displaySidebar.style.transform = "translateX(0px)";
  }, 1);
};

const hideSidebar = () => {
  displaySidebar.style.transform = "translateX(300px)";
  navbar.style.justifyContent = "space-around";
  navbar.style.padding = "20px";
  iAm.style.fontSize = "20px";
  viewSidebar.style.display = "block";
  setTimeout(() => {
    displaySidebar.style.display = "none";
  }, 1000);
};

// Select all the links
const navLinks = document.querySelectorAll(".navbar .navLinks li");
const navLinks2 = document.querySelectorAll(".navbar.sidebar li ");

// Function to remove 'active' class from all links and add to the clicked one
function handleNavLinkClick(event) {
  navLinks.forEach((link) => link.classList.remove("active"));
  event.currentTarget.classList.add("active");
}
const handleNavLinkClick2 = (event2) => {
  navLinks.forEach((link2) => link2.classList.remove("active2"));
  event2.currentTarget.classList.add("active2");
};

// Add event listeners to all links
navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});
navLinks2.forEach((link2) => {
  link2.addEventListener("click", handleNavLinkClick2);
});
