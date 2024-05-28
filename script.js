console.log("Just for testing");
const displaySidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".navbar");
const image1 = document.getElementById("image1");
const iAm = document.querySelector(".left h2");
const viewSidebar = document.querySelector(".navbar li:nth-child(8)");

const showSidebar = () => {
  navbar.style.justifyContent = "space-between";
  navbar.style.padding = "20px 10px";
  viewSidebar.style.display = "none";
  displaySidebar.style.display = "block";
  image1.style.display = "none";
  iAm.style.fontSize = "15px";
  setTimeout(() => {
    displaySidebar.style.transform = "translateX(0px)";
  }, 1);
};

const hideSidebar = () => {
  displaySidebar.style.transform = "translateX(300px)";
  navbar.style.justifyContent = "space-around";
  navbar.style.padding = "20px";
  image1.style.display = "block";
  iAm.style.fontSize = "20px";
  viewSidebar.style.display = "block";
  setTimeout(() => {
    displaySidebar.style.display = "none";
  }, 2000);
};
