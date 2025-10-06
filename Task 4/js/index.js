// index page script for welcome message and sign in/out button toggle
const messageElement = document.getElementById("welcomeMessage");
const signinButton = document.getElementById("signinBtn");
const signoutButton = document.getElementById("signoutBtn");

const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("user");
console.log(userName) ;
console.log(localStorage.getItem(userName))
if (localStorage.getItem(userName)) {
  messageElement.textContent = `Welcome, ${userName}`;
  messageElement.style.display = "inline-block";
  signinButton.style.display = "none";
  signoutButton.style.display = "block";
} else if(userName != null) {
  window.location.href = "./NotFound.html"
}





// sign in page validation
const form1 = document.forms["signinform"];

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

function validate() {
  const username = form1["username"];
  const password = form1["password"];

  const errorArray = document.getElementsByClassName("error");

  username.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  password.addEventListener("input", () => {
    errorArray[1].innerText = "";
  });

  // Validation checks
  if (username.value === "") {
    errorArray[0].innerText = "username is required";
    return;
  } else {
    errorArray[0].innerText = "";
  }

  if (password.value === "") {
    errorArray[1].innerText = "password is required";
    return;
  } else {
    errorArray[1].innerText = "";
  }

  // If all validations pass, submit the form
  if (localStorage.getItem(username.value) === null) {
    errorArray[0].innerText = "Username not registered";
    return;
  }

  const storedData = JSON.parse(localStorage.getItem(username.value));
  if (storedData.password !== password.value) {
    errorArray[1].innerText = "Incorrect password";
    return;
  }

  // Redirect to index.html with username as query parameter
  const signinButton = document.getElementById("signin");
  signinButton.textContent = "Signing In...";
  signinButton.disabled = true;

  window.location.href = `index.html?user=${username.value}`;
}


function confirmation(){
  let confirmation = confirm("Are you sure you want to sign out?");

  if (confirmation) {
    alert("Sign out successfully!");
    window.location.href = "./index.html";
  }
}


validatePassword = (password) => {
  // Password must be at least 8 characters long, contain at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


// Function to open the signup modal from the first modal
/*
function openSignupModal() {
  // Get modal instances
  const firstModal = bootstrap.Modal.getInstance(
    document.getElementById("signinModal")
  );
  const secondModal = new bootstrap.Modal(
    document.getElementById("signupModal")
  );

  // Hide first modal and show second modal
  firstModal.hide();

  // Wait for first modal to be completely hidden
  document
    .getElementById("signinModal")
    .addEventListener("hidden.bs.modal", function () {
      document.getElementById("signupModal");
  });

  // Hide first modal and show second modal
  firstModal.hide();

  // Wait for first modal to be completely hidden
  document
    .getElementById("signinModal")
    .addEventListener("hidden.bs.modal", function () {
      secondModal.show();
    });
}
*/


// sign up page validation
/*
const form2 = document.forms["signupform"];

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

function validate() {
  const name = form2["name"];
  const email = form2["email2"];
  const password = form2["password2"];
  const confirmPassword = form2["confirmPassword"];
  const phone = form2["phone"];
  const dob = form2["dateofbirth"];
  const gender = form2["gender"];
  const terms = form2["terms"];

  const errorArray = document.getElementsByClassName("error");

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  console.log(phone);
  console.log(dob);
  console.log(gender);
  console.log(terms);
  console.log(errorArray);

  name.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  email.addEventListener("input", () => {
    errorArray[1].innerText = "";
  });

  password.addEventListener("input", () => {
    errorArray[2].innerText = "";
  });

  confirmPassword.addEventListener("input", () => {
    errorArray[3].innerText = "";
  });

  phone.addEventListener("input", () => {
    errorArray[4].innerText = "";
  });

  dob.addEventListener("input", () => {
    errorArray[5].innerText = "";
  });

  for (let i = 0; i < gender.length; i++) {
    gender[i].addEventListener("change", () => {
      errorArray[6].innerText = "";
    });
  }

  terms.addEventListener("change", () => {
    errorArray[7].innerText = "";
  });


  // Validation checks
  if (name.value === "") {
    errorArray[0].innerText = "name is required";
    return;
  } else {
    errorArray[0].innerText = "";
  }

  if (email.value === "") {
    errorArray[1].innerText = "Email is required";
    return;
  } else if (!validateEmail(email.value.toLowerCase())) {
    errorArray[1].innerText = "Invalid email format";
    return;
  } else {
    errorArray[1].innerText = "";
  }

  if (password.value === "") {
    errorArray[2].innerText = "Password is required";
    return;
  } else if (!validatePassword(password.value)) {
    errorArray[2].innerText =
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    return;
  } else {
    errorArray[2].innerText = "";
  }

  if (confirmPassword.value === "") {
    errorArray[3].innerText = "Confirm Password is required";
    return;
  } else if (confirmPassword.value !== password.value) {
    errorArray[3].innerText = "Passwords do not match";
    return;
  } else {
    errorArray[3].innerText = "";
  }

  if (phone.value === "") {
    errorArray[4].innerText = "Phone number is required";
    return;
  } else if (phone.value.length < 10) {
    errorArray[4].innerText = "Phone number must be 10 digits";
    return;
  } else {
    errorArray[4].innerText = "";
  }

  if (dob.value === "") {
    errorArray[5].innerText = "Date of Birth is required";
    return;
  } else {
    errorArray[5].innerText = "";
  }

  if (gender.value === "") {
    errorArray[6].innerText = "Gender is required";
    return;
  } else {
    errorArray[6].innerText = "";
  }

  if (!terms.checked) {
    errorArray[7].innerText = "You must accept the terms and conditions";
    return;
  } else {
    errorArray[7].innerText = "";
  }


  // If all validations pass, submit the form
  localStorage.setItem(email.value, JSON.stringify({
    name: name.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    dateofbirth: dob.value,
    gender: gender.value,
  }));
  alert("Sign up successful!");
  
  window.location.href = "./signin.html";
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
*/



// navigation bar close and display

const menuBtn = document.getElementById('menu-toggle')
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click' , () => {
  navbar.style.display = 'block';
});

const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', () => {
  navbar.style.display = 'none';
})