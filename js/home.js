// navigation bar close and display
const menuBtn = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click' , () => {
  navbar.style.display = 'block';
  navbar.style.width = '400px';
  navbar.style.opacity = '1';
});

const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', () => {
  navbar.style.display = 'none';
  navbar.style.width = '0';
  navbar.style.opacity = '0';
})



const messageElement = document.getElementById("welcomeMessage");

currentUser = getCookie('currentUser');

if(currentUser) {
  messageElement.textContent = `Hello, ${currentUser}`;
  messageElement.style.display = "inline-block";
} else {
    location.href = "index.html";
}


// get cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function signout() {
  // delete cookies
  document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "currentUserEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

  location.href = "./index.html";
}