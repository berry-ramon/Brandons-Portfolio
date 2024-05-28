console.log("Just for testing");
const displaySidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".navbar");
const viewSidebar = document.querySelector(".navbar li:nth-child(8)");

const showSidebar = () => {
  navbar.style.justifyContent = "space-between";
  navbar.style.padding = "20px 10px";
  viewSidebar.style.display = "none";
  displaySidebar.style.display = "block";
  setTimeout(() => {
    displaySidebar.style.transform = "translateX(0px)";
  }, 1000);
};

const hideSidebar = () => {
  displaySidebar.style.transform = "translateX(300px)";
  navbar.style.justifyContent = "space-around";
  navbar.style.padding = "20px";
  viewSidebar.style.display = "block";
  setTimeout(() => {
    displaySidebar.style.display = "none";
  }, 2000);
};
