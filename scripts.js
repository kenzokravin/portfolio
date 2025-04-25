function onMobileNav() {
    var h = document.getElementById('h-icon');

    h.classList.remove('icn-spinner', 'rev-icn-spinner'); 

    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
      h.className = ' fa fa-lg fa-bars rev-icn-spinner';
    } else {
      x.style.display = "block";
      h.className += ' icn-spinner';
    }

    

}