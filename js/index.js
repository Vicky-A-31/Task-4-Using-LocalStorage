// index page script for welcome message and sign in/out button hide and show
const messageElement = document.getElementById("welcomeMessage");
const signinBtn = document.getElementById("signinBtn");
const signoutBtn = document.getElementById("signoutBtn");

currentUser = getCookie('currentUser');

if(currentUser) {
  messageElement.textContent = `Hello, ${currentUser}`;
  messageElement.style.display = "inline-block";
  signinBtn.style.display = "none";
  signoutBtn.style.display = "block";
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

  location.reload();
}





// hide and show sign up and sign in forms
$(document).ready(function(){
    // Prevent the link from jumping and hide the div
    $("#signup-link").click(function(e){
        e.preventDefault(); // Prevents the default anchor tag behavior
        // reset form inputs
        resetFormData();
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



// sign in form inputs
const form1 = document.forms["signinform"];
const email1 = form1["email1"];
const password1 = form1["password1"];
const mistakeArray = document.getElementsByClassName("mistake");
const signinButton = document.getElementById("signin");

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  validateSigninForm();
});


const storedData = JSON.parse(localStorage.getItem('registeredUsers'));
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
  } else if(!isEmailExists(email1.value)) {
    mistakeArray[0].innerText = "email is not registered";
    return; 
  } 

  const existUser = isEmailExists(email1.value);
  if (password1.value === "") {
    mistakeArray[1].innerText = "password is required";
    return;
  } else if(password1.value != existUser['password']) {
    mistakeArray[1].innerText = "incorrect password";
    return;
  }


  signinButton.textContent = "Signing In...";
  signinButton.disabled = true;
  setCookie('currentUser', existUser['name']);
  setCookie('currentUserEmail', email1.value);
  
  // dismiss the modal
  setTimeout(() => {
    location.href = "./home.html";
  }, 500)
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


form2.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});




document.getElementById("phone").addEventListener("keydown", function (event) {
  // Allow control keys like Backspace, Delete, Arrow keys, etc.
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  // Allow numbers (0-9) and control keys
  if (
    (event.key >= "0" && event.key <= "9") ||
    allowedKeys.includes(event.key)
  ) {
    return; // Allow the keypress
  }

  // Prevent all other keys
  event.preventDefault();
});



// Function to check if email already exists in localStorage
function isEmailExists(email) {
  if(storedData){
    for (let obj of storedData) {
      for(let key in obj) {
        // Check if the value matches the email we're looking for
        if (key === email) {
          return obj[key];
        }
      }
    }
  }
  return false;
}


email2.addEventListener("input", () => {
  if (isEmailExists(email2.value.toLowerCase())) {
    errorArray[2].innerText = "email is already registered";
  } else {
    errorArray[2].innerText = "";
  }
});


function validate() {

  Name.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  username.addEventListener("input", () => {
    if (username.value === existUser['username']) {
      errorArray[1].innerText = "username is not available";
    } else {
      errorArray[1].innerText = "";
    }
  });

  email2.addEventListener("input", () => {
    if (isEmailExists(email2.value.toLowerCase())) {
      errorArray[2].innerText = "email is already registered";
    } else {
      errorArray[2].innerText = "";
    }
  });

  password2.addEventListener("input", () => {
    errorArray[3].innerText = "";
  });

  confirmPassword.addEventListener("input", () => {
    errorArray[4].innerText = "";
  });

  phone.addEventListener("input", () => {
    errorArray[5].innerText = "";
  });

  dob.addEventListener("input", () => {
    errorArray[6].innerText = "";
  });

  for (let i = 0; i < gender.length; i++) {
    gender[i].addEventListener("change", () => {
      errorArray[7].innerText = "";
    });
  }

  terms.addEventListener("change", () => {
    errorArray[8].innerText = "";
  });

  // Validation checks
  if (Name.value === "") {
    errorArray[0].innerText = "name is required";
    Name.focus();
    return;
  } 

  if (username.value === "") {
    errorArray[1].innerText = "username is required";
    username.focus();
    return;
  } 

  if (email2.value === "") {
    errorArray[2].innerText = "email is required";
    email2.focus();
    return;
  } else if (!validateEmail(email2.value.toLowerCase())) {
    errorArray[2].innerText = "invalid email format";
    email2.focus();
    return;
  } else if (isEmailExists(email2.value.toLowerCase())) {
    errorArray[2].innerText = "email is already registered";
    email2.focus();
    return;
  } 

  if (password2.value === "") {
    errorArray[3].innerText = "password is required";
    password2.focus();
    return;
  } else if (!validatePassword(password2.value)) {
    errorArray[3].innerText = "invalid password kindly hover on info";
    password2.focus();
    return;
  } 

  if (confirmPassword.value === "") {
    errorArray[4].innerText = "confirm Password is required";
    confirmPassword.focus();
    return;
  } else if (confirmPassword.value !== password2.value) {
    errorArray[4].innerText = "password does not match";
    confirmPassword.focus();
    return;
  } 

  if (phone.value === "") {
    errorArray[5].innerText = "phone number is required";
    phone.focus();
    return;
  } else if (phone.value.length < 10) {
    errorArray[5].innerText = "phone number must be 10 digits";
    phone.focus();
    return;
  } 

  if (dob.value === "") {
    errorArray[6].innerText = "date of Birth is required";
    dob.focus();
    return;
  } 

  if (gender.value === "") {
    errorArray[7].innerText = "gender is required";
    return;
  } 

  if (!terms.checked) {
    errorArray[8].innerText = "you must accept the terms and conditions";
    return;
  } 

  // If all validations pass, submit the form

  if(!localStorage.getItem("registeredUsers")) {
    const users = [];
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }

  const users = JSON.parse(localStorage.getItem('registeredUsers'));
  const newuser = {
    name : Name.value,
    username : username.value,
    email : email2.value,
    password : password2.value,
    gender : gender.value,
    dob : dateofbirth.value,
    phone : phone.value,
  }

  const email = email2.value.toLowerCase();
  const myobj = {}
  myobj[email] = newuser;
  users.push(myobj);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  setCookie('currentUser', Name.value);
  setCookie('currentUserEmail', email);

  location.href = './home.html';
}


// create cookie
function setCookie(cname, cvalue, exdays) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}


function resetFormData() {
  email1.value = "";
  password1.value = "";
  for(let error of mistakeArray) {
    error.innerText = ""
  }


  Name.value = "";
  username.value = "";
  email2.value = "";
  password2.value = "";
  dateofbirth.value = "";
  phone.value = "";
  confirmPassword.value = "";
  terms.checked = false;
  for(let i=0; i<gender.length; i++) {
    gender[i].checked = false;
  }

  for(let error of errorArray) {
    error.innerText = "";
  }
}



function showRegistrationSuccessModal() {

  const registrationSuccessModal = new bootstrap.Modal(
    document.getElementById("signupSuccessModal")
  );
  registrationSuccessModal.show();
}