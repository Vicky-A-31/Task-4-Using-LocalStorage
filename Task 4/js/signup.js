const form = document.forms["myform"];

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

function validate() {
  const name = form["name"];
  const email = form["email"];
  const password = form["password"];
  const confirmPassword = form["confirmPassword"];
  const phone = form["phone"];
  const dob = form["dateofbirth"];
  const gender = form["gender"];
  const terms = form["terms"];

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
