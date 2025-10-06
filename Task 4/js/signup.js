const form = document.forms["myform"];
const errorArray = document.getElementsByClassName("error");

form.addEventListener("submit", (e) => {
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

const username = form['username'];
username.addEventListener('input', () => {
  if(localStorage.getItem(username.value)) {
    errorArray[1].innerText = "username is not available";
  } else {
    errorArray[1].innerText = "";
  }
});


function validate() {
  const name = form["name"];
  const email = form["email"];
  const password = form["password"];
  const confirmPassword = form["confirmPassword"];
  const phone = form["phone"];
  const dob = form["dateofbirth"];
  const gender = form["gender"];
  const terms = form["terms"];



  name.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  username.addEventListener('input', () => {
  if(localStorage.getItem(username.value)) {
    errorArray[1].innerText = "username is not available";
  } else {
    errorArray[1].innerText = "";
  }
  });

  email.addEventListener("input", () => {
    errorArray[2].innerText = "";
  });

  password.addEventListener("input", () => {
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
  if (name.value === "") {
    errorArray[0].innerText = "name is required";
    name.focus();
    return;
  } else {
    errorArray[0].innerText = "";
  }

  if (username.value === "") {
    errorArray[1].innerText = "username is required";
    username.focus();
    return;
  } else if(localStorage.getItem(username.value)) { 
    errorArray[1].innerText = "username is not available";
    username.focus();
    return;
  } else {
    errorArray[1].innerText = "";
  }

  if (email.value === "") {
    errorArray[2].innerText = "email is required";
    email.focus();
    return;
  } else if (!validateEmail(email.value.toLowerCase())) {
    errorArray[2].innerText = "invalid email format";
    email.focus();
    return;
  } else {
    errorArray[2].innerText = "";
  }

  if (password.value === "") {
    errorArray[3].innerText = "password is required";
    password.focus();
    return;
  } else if (!validatePassword(password.value)) {
    errorArray[3].innerText =
      "invalid password kindly hover on info";
    password.focus();
      return;
  } else {
    errorArray[3].innerText = "";
  }

  if (confirmPassword.value === "") {
    errorArray[4].innerText = "confirm Password is required";
    confirmPassword.focus();
    return;
  } else if (confirmPassword.value !== password.value) {
    errorArray[4].innerText = "password does not match";
    confirmPassword.focus();
    return;
  } else {
    errorArray[4].innerText = "";
  }

  if (phone.value === "") {
    errorArray[5].innerText = "phone number is required";
    phone.focus();
    return;
  } else if (phone.value.length < 10) {
    errorArray[5].innerText = "phone number must be 10 digits";
    phone.focus();
    return;
  } else {
    errorArray[5].innerText = "";
  }

  if (dob.value === "") {
    errorArray[6].innerText = "date of Birth is required";
    dob.focus();
    return;
  } else {
    errorArray[6].innerText = "";
  }

  if (gender.value === "") {
    errorArray[7].innerText = "gender is required";
    return;
  } else {
    errorArray[7].innerText = "";
  }

  if (!terms.checked) {
    errorArray[8].innerText = "you must accept the terms and conditions";
    return;
  } else {
    errorArray[8].innerText = "";
  }


  // If all validations pass, submit the form
  localStorage.setItem(username.value, JSON.stringify({
    name: name.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    dateofbirth: dob.value,
    gender: gender.value,
  }));
  

  showRegistrationSuccessModal();
}


function showRegistrationSuccessModal() {
  const registrationSuccessModal = new bootstrap.Modal(document.getElementById('signupSuccessModal'));
  registrationSuccessModal.show();
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
