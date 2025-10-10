
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
const itemsContainer = document.querySelector('.items-container');

document.addEventListener('DOMContentLoaded', ()=> {
  let cartItems = getCartItems(currentUserEmail);
  displayItems(cartItems);
})



// display cart items
function displayItems(cartItems) {

  if(cartItems.length != 0) {
    noItemsFound.style.display = 'none';
    cartItems.forEach(element => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = '<h5 class="card-header">Details</h5>';

      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      let table = document.createElement('table');

      let tr1 = document.createElement('tr');
      tr1.innerHTML = '<td>Item Name</td>';
      let td1 = document.createElement('td');
      td1.textContent = element['itemName'];
      tr1.appendChild(td1);
      table.appendChild(tr1);

      let tr2 = document.createElement('tr');
      tr2.innerHTML = '<td>Brand Name</td>';
      let td2 = document.createElement('td');
      td2.textContent = element['brandName'];
      tr2.appendChild(td2);
      table.appendChild(tr2);

      let tr3 = document.createElement('tr');
      tr3.innerHTML = '<td>Quantity</td>';
      let td3 = document.createElement('td');
      td3.textContent = element['quantity'];
      tr3.appendChild(td3);
      table.appendChild(tr3);

      let tr4 = document.createElement('tr');
      tr4.innerHTML = '<td>Price</td>';
      let td4 = document.createElement('td');
      td4.textContent = element['price'];
      tr4.appendChild(td4);
      table.appendChild(tr4);

      let tr5 = document.createElement('tr');
      tr5.innerHTML =  '<td>Total</td>';
      let td5 = document.createElement('td');
      td5.textContent = element['totalAmount'];
      tr5.appendChild(td5);
      table.appendChild(tr5);

      cardBody.append(table);
      card.appendChild(cardBody);
      
      let cardFooter = document.createElement('div');
      cardFooter.classList.add('card-footer');
      let btn1 = `<button class="btn btn-danger" onclick=showDeleteItemModal(${element.id});><i class="bi bi-trash"></i></button>`;
      cardFooter.insertAdjacentHTML('beforeend', btn1);
      let btn2 = `<button class="btn btn-secondary" onclick=showEditModal(${element.id});><i class="bi bi-pencil-square"></i></button>`;
      cardFooter.insertAdjacentHTML('beforeend', btn2);

      card.appendChild(cardFooter);
      itemsContainer.append(card);
    });

  } else {
    noItemsFound.style.display = 'block';
  }
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


// validate and add new item form
function validate(id) {

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


  // If all validations pass, submit the form;
    const newItem = {
    itemName : itemName.value,
    brandName : brandName.value,
    quantity : quantity.value,
    price : price.value,
    totalAmount : (Number(quantity.value) * Number(price.value)),
    description : description.value,
    }

    addItemToUser(currentUserEmail, newItem);
    
    // dismiss addItemModal
    const addModal = bootstrap.Modal.getInstance(
      document.getElementById('addItemModal')
    );
    
    addModal.hide();
    // show Item added popup
    showItemAddedModal();

    // reseting form data
    resetFormData();
  
    /*
    const users = getRegisteredUsers();
    const userObj = users.find(user => user.hasOwnProperty(currentUserEmail));
    const item = userObj[currentUserEmail].cartItems.find(item => item.id == id);
    item.itemName = itemName.value;
    item.brandName = brandName.value;
    item.quantity = quantity.value;
    item.price = price.value;
    item.totalAmount = (Number(quantity.value) * Number(price.value));
    item.description = description.value;

    userObj[currentUserEmail].cartItems  = userObj[currentUserEmail].cartItems.filter(item => item.id != id);

    userObj[currentUserEmail].cartItems.push(item);
    saveRegisteredUsers(users);
    */
}








// utility functions
function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
}

function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Add new item to user's items array
function addItemToUser(userEmail, newItem) {
    const users = getRegisteredUsers();
    
    // Find the user object
    const userObj = users.find(user => user.hasOwnProperty(userEmail));
    
    if (userObj && userObj[userEmail].cartItems) {
        // Add ID if not present
        if (!newItem.id) {
            newItem.id = userObj[userEmail].cartItems.length;
        }
        
        // Add the new item to user's items array
        userObj[userEmail].cartItems.push(newItem);
        saveRegisteredUsers(users);
    }
}

// Get all items for a user
function getCartItems(userEmail) {
    const users = getRegisteredUsers();
    
    const userObj = users.find(user => user.hasOwnProperty(userEmail));
    
    return userObj && userObj[userEmail].cartItems ? userObj[userEmail].cartItems : [];
}

// delete item from user's items array
function removeItemFromUser(userEmail, itemId) {
    const users = getRegisteredUsers();
    const userObj = users.find(user => user.hasOwnProperty(userEmail));
    
    if (userObj && userObj[userEmail].cartItems) {
        // Filter out the item to remove
        userObj[userEmail].cartItems = userObj[userEmail].cartItems.filter(item => item.id !== itemId);
        saveRegisteredUsers(users);
    }
}


function updateItemIds() {
  const users = getRegisteredUsers();
  const userObj = users.find(user => user.hasOwnProperty(currentUserEmail));
  userObj[currentUserEmail].cartItems = userObj[currentUserEmail].cartItems.map((item, index) => { 
    return { ...item, id : index }
  });
  saveRegisteredUsers(users);
}


// show Item added modal
function showItemAddedModal() {
  const modal = new bootstrap.Modal(
    document.getElementById("itemAddedModal")
  );
  modal.show();

  setTimeout(() => {
    const cartItems = getCartItems(currentUserEmail);
    itemsContainer.innerHTML = "";
    displayItems(cartItems);
  }, 1000);
}





// show edit modal
function showEditModal(id) {
  const editModal = new bootstrap.Modal(
    document.getElementById('editItemModal')
  );

  editModal.show(); 
  
  const cartItems = getCartItems(currentUserEmail);
  const item = cartItems.find(item => item.id == id);
  itemName.value = item.itemName;
  brandName.value = item.brandName;
  quantity.value = item.quantity;
  price.value = item.price;
  description.value = item.description;
} 






// show delete confirm modal 
// A persistent handler that knows how to delete.
// The `id` needs to be passed to it when called.
let okHandler = null;

const confirm = document.querySelector('#confirm');

function showDeleteItemModal(id) {
  const modal = new bootstrap.Modal(
    document.getElementById("deleteItemModal")
  );
  modal.show();

  // Remove any previous handler to prevent multiple executions
  if (okHandler) {
    confirm.removeEventListener('click', okHandler);
  }

  // Define a new handler for the current ID
  okHandler = () => {
    removeItemFromUser(currentUserEmail, id);
    updateItemIds();

    // Re-display the updated cart items
    const cartItems = getCartItems(currentUserEmail);
    itemsContainer.innerHTML = "";
    displayItems(cartItems);

    // Hide the modal
    modal.hide();

    // Remove this event listener after it's been used
    confirm.removeEventListener('click', okHandler);
    okHandler = null; // Reset handler
  };
  
  confirm.addEventListener('click', okHandler);
}
