
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


// get current cookie and display current user name
const messageElement = document.getElementById("welcomeMessage");
const noItemsFound = document.getElementById('no-items-found');

const currentUser = getCookie('currentUser');
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


// signout functionality
function signout() {
  // delete cookies
  document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "currentUserEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

  location.href = "./index.html";
}





// add items to cartItems array and display cartItems
const currentUserEmail = getCookie('currentUserEmail');
const usersList = JSON.parse(localStorage.getItem('registeredUsers'));
const itemsContainer = document.querySelector('.items-container');

console.log(usersList)
let currentUserData = {};
for(let obj of usersList) {
  if(obj[currentUserEmail]) {
    currentUserData = obj[currentUserEmail];
    break;
  }
}
let cartItems = currentUserData['cartItems'];
const showBtn = document.getElementById('showBtn')

/*
showBtn.addEventListener('click', ()=> {
  showBtn.disabled = true;

  if(cartItems.length != 0) {
    cartItems.forEach(element => {
      let card = document.createElement('div');
      card.classList.add('card');
      let img = document.createElement('img');
      img.src = element['imageUrl'];
      img.alt = 'image';
      card.appendChild(img);
      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      let h5 = document.createElement('h5');
      h5.classList.add('card-title');
      h5.textContent = element['name'];
      cardBody.appendChild(h5);
      card.appendChild(cardBody);
      itemsContainer.appendChild(card);
    });
  } else {
    noItemsFound.style.display = 'block';
  }
})
*/


function addItem(card) {
  let itemDetails = {};
  itemDetails.imageUrl = card.firstElementChild.getAttribute('src');
  itemDetails.name = card.lastElementChild.firstElementChild.textContent;
  cartItems.push(itemDetails);
  currentUserData['cartItems'] = cartItems;
  
  for(let obj of usersList) {
    if(obj[currentUserEmail]) {
      obj[currentUserEmail] = currentUserData;
      break;
    }
  }
  localStorage.setItem('registeredUsers', JSON.stringify(usersList));
}




// reset form data when click the close button
const form = document.forms['addForm'];
const itemName = form['itemname'];
const brandName = form['brandname'];
const quantity = form['quantity'];
const price = form['price'];
const description = form['description'];
const errorArray = document.getElementsByClassName("error");

function resetFormData() {
  itemName.value = "";
  brandName.value = "";
  quantity.value = "";
  price.value = "";
  description.value = "";

  for(let error of errorArray) {
    error.innerText = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});


// quantity field allows only numbers
document.getElementById("quantity").addEventListener("keydown", function (event) {
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


// validate add new item form
function validate() {

  itemName.addEventListener("input", () => {
    errorArray[0].innerText = "";
  });

  brandName.addEventListener("input", () => {
      errorArray[1].innerText = "";
  });      

  quantity.addEventListener("input", () => {
    errorArray[2].innerText = "";
  });

  price.addEventListener("change", () => {
    errorArray[3].innerText = "";
  });

  // Validation checks
  if (itemName.value === "") {
    errorArray[0].innerText = "item name is required";
    itemName.focus();
    return;
  } 

  if (brandName.value === "") {
    errorArray[1].innerText = "brand name is required";
    brandName.focus();
    return;
  } 

  if (quantity.value === "") {
    errorArray[2].innerText = "quantity is required";
    quantity.focus();
    return;
  } 

  if (price.value === "") {
    errorArray[3].innerText = "price is required";
    price.focus();
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
    cartItems : [],
  }

  const email = email2.value.toLowerCase();
  const myobj = {}
  myobj[email] = newuser;
  users.push(myobj);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
}




// show Item added modal
function showItemAddedModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("itemAddedModal")
  );
  modal.show();
}