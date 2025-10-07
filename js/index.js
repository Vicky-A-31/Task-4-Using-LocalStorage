// index page script for welcome message and sign in/out button toggle
const messageElement = document.getElementById("welcomeMessage");
const signinBtn = document.getElementById("signinBtn");
const signoutBtn = document.getElementById("signoutBtn");

if(localStorage.getItem('currentUser')) {
  messageElement.textContent = `Hello, ${localStorage.getItem('currentUser')}`;
  messageElement.style.display = "inline-block";
  signinBtn.style.display = "none";
  signoutBtn.style.display = "block";
}



// hide and show sign up and sign in forms
$(document).ready(function(){
    // Prevent the link from jumping and hide the div
    $("#signup-link").click(function(e){
        e.preventDefault(); // Prevents the default anchor tag behavior
        $("#signin-content").hide();
        $("#signinForm-title").hide();
        $("#signupForm-title").show();
        $("#signup-content").show();
    });

    // Prevent the link from jumping and show the div
    $("#signin-link").click(function(e){
        e.preventDefault(); // Prevents the default anchor tag behavior
        $("#signup-content").hide();
        $("#signupForm-title").hide();
        $("#signinForm-title").show();
        $("#signin-content").show();
    });

    // To hide a Signup content and show a Signin content after a Bootstrap modal's data-bs-dismiss button is clicked
    $('#formModal').on('hidden.bs.modal', function () {
        $("#signup-content").hide();
        $("#signupForm-title").hide();
        $("#signinForm-title").show();
        $("#signin-content").show();
    });
});

$(document).ready(function() {
    
});



// sign in form inputs
const form1 = document.forms["signinform"];
console.log(form1)
const email1 = form1["email1"];
const password1 = form1["password1"];
const mistakeArray = document.getElementsByClassName("mistake");
const signinButton = document.getElementById("signin");

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  validateSigninForm();
});



function validateSigninForm() {
  email1.addEventListener("input", () => {
    mistakeArray[0].innerText = "";
  });

  password1.addEventListener("input", () => {
    mistakeArray[1].innerText = "";
  });

  

  // Validation checks
  if (email1.value === "") {
    mistakeArray[0].innerText = "email is required";
    return;
  } else if (!validateEmail(email1.value.toLowerCase())) {
    mistakeArray[0].innerText = "invalid email format";
    return;
  } else {
    mistakeArray[0].innerText = "";
  }


  const storedData = JSON.parse(localStorage.getItem(email1.value));
  if (password1.value === "") {
    mistakeArray[1].innerText = "password is required";
    return;
  } else if (storedData.password !== password1.value) {
    mistakeArray[1].innerText = "Incorrect password";
    return;
  } else {
    mistakeArray[1].innerText = "";
  }


  signinButton.textContent = "Signing In...";
  signinButton.disabled = true;
  localStorage.setItem('currentUser', storedData.name);
  
  // dismiss the modal
  setTimeout(() => {
    const signinModal = document.getElementById('signinModal');
    const modal = bootstrap.Modal.getInstance(signinModal); 
    modal.hide();
  
    messageElement.textContent = `Hii, ${localStorage.getItem('currentUser')}`;
    messageElement.style.display = "inline-block";
    signinBtn.style.display = "none";
    signoutBtn.style.display = "block";
  }, 500)
}


function signout() {
  localStorage.removeItem('currentUser');

  // dismiss the modal
  const confirmModal = document.getElementById('confirmModal');
  const modal = bootstrap.Modal.getInstance(confirmModal); 
  modal.hide();
  messageElement.style.display = 'none';
  signinBtn.style.display = 'block';
  signoutBtn.style.display = 'none';
  email1.value = "";
  password1.value = "";
  signinButton.textContent = "Sign In";
  signinButton.disabled = false;
}


validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};


validatePassword = (password) => {
  // Password must be at least 8 characters long, contain at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


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






// sign up form inputs
const form2 = document.forms["signupform"];
console.log(form2)
const Name = form2["name"];
const username = form2["username"];
const email2 = form2["email2"];
const password2 = form2["password2"];
const confirmPassword = form2["confirmPassword"];
const phone = form2["phone"];
const dob = form2["dateofbirth"];
const gender = form2["gender"];
const terms = form2["terms"];
const errorArray = document.getElementsByClassName("error");