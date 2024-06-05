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

// refresh.addEventListener("click", () => {
//   window.location.reload();
// });

const refresh = document.querySelector(".refresher");

refresh.addEventListener("click", () => {
  isIntervalOn = true;
  let contentDiv = document.querySelector(".skills");
  let currentContent = contentDiv.innerHTML;
  contentDiv.innerHTML = currentContent;
  // Refresh the content
});

const download = document.querySelector(".button");
const i = document.querySelector(".content i");
const cv = document.querySelector("#cvDownloadBtn");
const content = document.querySelector(".button .content");

download.addEventListener("click", () => {
  download.classList.add("downloaded");
  // downloading the cv
  download.dataset.download;
  const image = "./documents/BrandonKimathiResume.pdf";
  const a = document.createElement("a");
  a.href = image;
  a.download = "";
  a.style.display = "none";

  setTimeout(() => {
    download.classList.remove("downloaded");
    i.classList.replace("bx-cloud-download", "bx-check-circle");
    cv.innerText = "Completed";
    i.style.color = "black";
    cv.style.color = "black";
    download.style.background = "aqua";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const IsWidthSmall = (e) => {
      if (e.matches) {
        download.style.background = "#001725";
      } else {
        download.style.background =
          "linear-gradient(90deg, transparent 40%, #001725 50%)";
      }
    };
    setTimeout(() => {
      i.classList.replace("bx-check-circle", "bx-cloud-download");
      cv.innerText = "Download";
      cv.style.color = "aqua";
      i.style.color = "aqua";

      IsWidthSmall(mediaQuery);
    }, 2300);
  }, 4000);
});

// Animating elements on scroll
// const sections = document.querySelectorAll(".scrollEffect");
// window.onscroll = () => {
//   sections.forEach((section) => {
//     let top = window.scrollY;
//     let offset = section.offsetTop;
//     let height = section.offsetHeight;

//     if (top >= offset && top < offset + height) {
//       section.classList.add("pageAnimation");
//       section.classList.add("stay");
//     } else {
//       section.classList.remove("pageAnimation");
//     }
//   });
// };

// To be Deleted
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector(".container").addEventListener("click", f);
// });

// const f = (e) => {
//   console.log(e.target.tagName, "clicked");
//   console.log("clientX", e.clientX);
//   // console.log("clientY", e.clientY);
//   console.log("pageX", e.pageX);
//   // console.log("pageY", e.pageY);
//   console.log("screenX", e.screenX);
//   // console.log("screenY", e.screenY);
//   console.log("offsetX", e.offsetY);
//   // console.log("offsetY", e.offsetY);
// };
