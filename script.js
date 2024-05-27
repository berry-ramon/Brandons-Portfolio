console.log("Just for testing");
const displayNavbar = document.querySelector(".navLinks");
const show = document.querySelector(".menuOpen");
const container = document.querySelector(".container");
const hideNavbar = () => {
  show.style.display = "block";
  displayNavbar.style.transform = "translateX(400px)";
  setTimeout(() => {
    displayNavbar.style.display = "none";
  }, 1000);
};
const showNavbar = () => {
  show.style.display = "none";
  setTimeout(() => {
    displayNavbar.style.transform = "translateX(0px)";
  }, 10);
  displayNavbar.style.display = "block";
};
