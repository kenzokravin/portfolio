document.addEventListener("DOMContentLoaded", function () {
    let aboutSection = document.querySelector(".about-section");
  
    function checkScroll() {
      let sectionPosition = aboutSection.getBoundingClientRect().top;
      let screenPosition = window.innerHeight / 1.2;
  
      if (sectionPosition < screenPosition) {
        aboutSection.classList.add("show");
      }
    }
  
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on load
  });



   // Select all links in the header
   const links = document.querySelectorAll("#header a");
        
   // Function to highlight the active section in the header
   function highlightSection() {
       const sections = document.querySelectorAll("section");
       
       sections.forEach(section => {
           // Check if the section is in view
           const rect = section.getBoundingClientRect();
           const link = document.querySelector(`#header a[href="#${section.id}"]`);
           
           if (rect.top <= 0 && rect.bottom >= 0) {
               // Add the active box around the link when the section is in view
               link.classList.add("active-box");
           } else {
               // Remove the active box when the section is not in view
               link.classList.remove("active-box");
           }
       });
   }

   // Listen for scroll events
   window.addEventListener("scroll", highlightSection);