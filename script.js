let myIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) { myIndex = 1; }
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 4000);
}

function myFunction() {
  let x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
window.myFunction = myFunction;

let modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.querySelectorAll(".w3-button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "rotate(-5deg)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "rotate(0deg)";
  });
});
