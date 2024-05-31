console.log("Just for testing");
// Define the media query
const mediaQuery = window.matchMedia("(max-width: 968px)");

const displaySidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".navbar");
const iAm = document.querySelector(".left h2");
const viewSidebar = document.querySelector(".navbar li:nth-child(7)");

const hiderBtm = document.querySelector(".navHider a");
const viewerBtn = document.querySelector(".navViewer a");

const showSidebar = () => {
  navbar.style.justifyContent = "space-between";
  navbar.style.padding = "20px 0";
  viewSidebar.style.display = "none";
  hiderBtm.style.transform = "translateX(19px)";
  displaySidebar.style.transition = "2s";
  displaySidebar.style.display = "block";
  iAm.style.fontSize = "15px";
  setTimeout(() => {
    displaySidebar.style.transform = "translateX(0px)";
  }, 1);
};

const hideSidebarOn = (e) => {
  if (e.matches) {
    // Define the media query
    console.log("Device width is small. Executing specific functionality.");
    const hideSidebar = () => {
      displaySidebar.style.transform = "translateX(300px)";
      navbar.style.justifyContent = "space-around";
      hiderBtm.style.transform = "translateX(0)";
      navbar.style.padding = "10px 0";
      iAm.style.fontSize = "20px";
      viewSidebar.style.display = "block";
      setTimeout(() => {
        displaySidebar.style.display = "none";
      }, 1000);
    };
    hideSidebar();
  } else {
    console.log("Device width is large. Removing specific functionality.");
  }
};
const navHider = () => {
  navbar.style.transform = "translateY(-100px)";
  hiderBtm.style.transform = "translateX(-100px)";
  viewerBtn.style.display = "block";

  setTimeout(() => {
    viewerBtn.style.transform = "translateY(0px)";
    hiderBtm.style.display = "none";
    navbar.style.display = "none";
  }, 1000);
};
const navViewer = () => {
  navbar.style.display = "inline-flex";
  viewerBtn.style.transform = "translateX(100px)";
  hiderBtm.style.display = "block";

  setTimeout(() => {
    hiderBtm.style.transform = "translateX(0px)";
    viewerBtn.style.display = "none";
    navbar.style.transform = "translateY(0px)";
  }, 1000);
};
// Select all the links
const navLinks = document.querySelectorAll(".navbar .navLinks li");

// Function to remove 'active' class from all links and add to the clicked one
function handleNavLinkClick(event) {
  navLinks.forEach((link) => link.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

// Add event listeners to all links
navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinkClick);
});
