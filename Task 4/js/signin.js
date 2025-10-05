const form = document.forms["myform"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});


function validate() {
  const email = form["email"];
  const password = form["password"];

  const errorArray = document.getElementsByClassName("error");

  console.log(email);
  console.log(password);

  email.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  password.addEventListener("input", () => {
    errorArray[1].innerText = "";
  });


  // Validation checks
  if (email.value === "") {
    errorArray[0].innerText = "Email is required";
    return;
  } else if (!validateEmail(email.value.toLowerCase())) {
    errorArray[0].innerText = "Invalid email format";
    return;
  } else {
    errorArray[0].innerText = "";
  }

  if (password.value === "") {
    errorArray[1].innerText = "Password is required";
    return;
  } else if (!validatePassword(password.value)) {
    errorArray[1].innerText =
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    return;
  } else {
    errorArray[1].innerText = "";
  }
  
  // If all validations pass, submit the form
  if(localStorage.getItem(email.value) === null) {
    errorArray[0].innerText = "Email not registered";
    return;
  }

  const storedData = JSON.parse(localStorage.getItem(email.value));
  if(storedData.password !== password.value) {
    errorArray[1].innerText = "Incorrect password";
    return;
  }
  
  // Redirect to index.html with username as query parameter
  const signinButton = document.getElementById("signin");
  signinButton.textContent = "Signing In...";
  signinButton.disabled = true;

  setTimeout(() => {
    window.location.href = `index.html?user=${storedData.name}`;
  }, 1000);
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
