window.addEventListener("DOMContentLoaded", () => {
  console.log("Just for testing");

  // Define the media query for devices with a max-width of 968px
  const mediaQuery = window.matchMedia("(max-width: 968px)");

  // Function to hide the sidebar when the media query matches
  const hideSidebarOn = (e) => {
    if (e.matches) {
      // Function to hide the sidebar with specific styling changes
      const hideSidebar = () => {
        displaySidebar.style.transform = "translateX(300px)";
        navbar.style.justifyContent = "space-around";
        navbar.style.padding = "10px 0";
        iAm.style.fontSize = "20px";
        viewSidebar.style.display = "block";
        // Hide the sidebar after 1 second
        setTimeout(() => {
          displaySidebar.style.display = "none";
        }, 1000);
      };
      hideSidebar();
    }
  };

  // Listen for changes in the media query and execute hideSidebarOn when it matches
  mediaQuery.addEventListener("change", hideSidebarOn);

  // Select DOM elements for sidebar, navbar, and other components
  const displaySidebar = document.querySelector(".sidebar");
  const navbar = document.querySelector(".navbar");
  const iAm = document.querySelector(".left h2");
  const viewSidebar = document.querySelector(".navbar li:nth-child(7)");

  const hiderBtm = document.querySelector(".navHider a");
  const viewerBtn = document.querySelector(".navViewer a");

  // Function to show the sidebar with specific styling changes
  const showSidebar = () => {
    navbar.style.justifyContent = "space-between";
    viewSidebar.style.display = "none";
    displaySidebar.style.transition = "2s";
    displaySidebar.style.display = "block";
    iAm.style.fontSize = "15px";
    // Show the sidebar after 1 second
    setTimeout(() => {
      displaySidebar.style.transform = "translateX(0px)";
    }, 1000);
  };

  // Function to hide the navbar with specific styling changes
  const navHider = () => {
    navbar.style.transform = "translateY(-100px)";
    hiderBtm.style.transform = "translateX(-100px)";
    viewerBtn.style.display = "block";
    // Hide the navbar after 1 second
    setTimeout(() => {
      viewerBtn.style.transform = "translateY(0px)";
      hiderBtm.style.display = "none";
      navbar.style.display = "none";
    }, 1000);
  };

  // Function to show the navbar with specific styling changes
  const navViewer = () => {
    navbar.style.display = "inline-flex";
    viewerBtn.style.transform = "translateX(100px)";
    hiderBtm.style.display = "block";
    // Show the navbar after 1 second
    setTimeout(() => {
      hiderBtm.style.transform = "translateX(0px)";
      viewerBtn.style.display = "none";
      navbar.style.transform = "translateY(0px)";
    }, 1000);
  };

  

  // Testimonials slider function
  const carousel = document.querySelector(".testimonial-cards");
  const cards = document.querySelectorAll(".testimonial-card");
  const cardWidth = cards[0].offsetWidth + 20; // Width of each card plus margin
  const totalCards = cards.length;
  let intervalId;

  // Function to start the automatic carousel sliding
  const startCarousel = () => {
    intervalId = setInterval(() => {
      carousel.append(carousel.firstElementChild);
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(${cardWidth}px)`;

      // Use requestAnimationFrame for smooth transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          carousel.style.transition = "transform 1s ease";
          carousel.style.transform = "translateX(0)";
        });
      });
    }, 2000);
  };

  // Function to stop the automatic carousel sliding
  const stopCarousel = () => {
    clearInterval(intervalId);
  };

  // Event listener for the previous button to manually slide the carousel
  document.getElementById("prev").addEventListener("click", () => {
    stopCarousel();
    carousel.prepend(carousel.lastElementChild);
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${cardWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        carousel.style.transition = "transform 1s ease";
        carousel.style.transform = "translateX(0)";
      });
    });
    startCarousel();
  });

  // Event listener for the next button to manually slide the carousel
  document.getElementById("next").addEventListener("click", () => {
    stopCarousel();
    carousel.append(carousel.firstElementChild);
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(${cardWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        carousel.style.transition = "transform 1s ease";
        carousel.style.transform = "translateX(0)";
      });
    });
    startCarousel();
  });

  // Add event listeners to pause and resume the carousel on mouseover and mouseout
  carousel.addEventListener("mouseover", stopCarousel);
  carousel.addEventListener("mouseout", startCarousel);

  // Start the carousel on page load
  startCarousel();

  // Select all the navigation links
  const navLinks = document.querySelectorAll(".navbar .navLinks li");

  // Function to remove 'active' class from all links and add to the clicked one
  function handleNavLinkClick(event) {
    navLinks.forEach((link) => link.classList.remove("active"));
    event.currentTarget.classList.add("active");
  }

  // Add event listeners to all navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  // Select DOM elements for download button, icon, and content
  const download = document.querySelector(".button");
  const i = document.querySelector(".content i");
  const cv = document.querySelector("#cvDownloadBtn");
  const content = document.querySelector(".button .content");

  // Event listener for the download button click
  download.addEventListener("click", () => {
    download.classList.add("downloaded");
    // Downloading the CV (currently using an image for demonstration)
    download.dataset.download;
    const image = "./documents/BrandonKimathiResume.pdf"; // Example file to download

    const a = document.createElement("a");
    a.href = image;
    a.download = "";
    a.style.display = "none";

    setTimeout(() => {
      download.classList.remove("downloaded");
      i.classList.replace("fa-cloud-download-alt", "fa-check-circle");
      cv.innerText = "Completed";
      i.style.color = "black";
      cv.style.color = "black";
      download.style.background = "aqua";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Adjust download button background based on media query
      const IsWidthSmall = (e) => {
        if (e.matches) {
          download.style.background = "#001725";
        } else {
          download.style.background =
            "linear-gradient(90deg, transparent 40%, transparent 50%)";
        }
      };

      // Reset the download button after 2.3 seconds
      setTimeout(() => {
        i.classList.replace("fa-check-circle", "fa-cloud-download-alt");
        cv.innerText = "Download";
        cv.style.color = "aqua";
        i.style.color = "aqua";

        IsWidthSmall(mediaQuery);
      }, 2300);
    }, 4000);
  });

  // Event listener for the form submit button click
  document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn2");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default button behavior

      // Get form input values
      const userName = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const phoneNumber = document.getElementById("phoneNumber").value;

      console.log(userName); // Log the userName to check value

      // Validate form inputs
      if (userName === "" || email === "" || phoneNumber === "") {
        alert("All fields are required");
        return;
      }

      // Create the WhatsApp URL with encoded form input values
      let url =
        "https://wa.me/+254758170917?text=" +
        "*Name :* " +
        encodeURIComponent(userName) +
        "%0a" +
        "*Phone :* " +
        encodeURIComponent(phoneNumber) +
        "%0a" +
        "*Email :* " +
        encodeURIComponent(email) +
        "%0a" +
        "*Message :* " +
        encodeURIComponent(message) +
        "%0a%0a";

      // Open the WhatsApp URL in a new tab
      window.open(url, "_blank");
    });
  });
});
// Function to update the main display content with a video, title, and description
  function updateMainDisplay(video, title, description) {
    document.getElementById("main-display-img").src = video;
    document.getElementById("main-display-title").textContent = title;
    document.getElementById("main-display-description").textContent =
      description;
  }
