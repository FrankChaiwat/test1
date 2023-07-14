var cartItems = [];
var menu = [
  { menu_id: 'F001', menu_name: "กุ้งเผาซีฟูด", menu_price: 399, quantity: 1 },
  { menu_id: 'F002', menu_name: "กุ้งแช่น้ำปลา", menu_price: 299, quantity: 1 },
  { menu_id: 'F003', menu_name: "ปลาเผา", menu_price: 299, quantity: 1 },
  { menu_id: 'F004', menu_name: "ปลาหมึกทอด", menu_price: 299, quantity: 1 },
  { menu_id: 'F005', menu_name: "ปลาต้มยำ", menu_price: 299, quantity: 1 },
  { menu_id: 'F006', menu_name: "ปลาเผาเกลือ", menu_price: 299, quantity: 1 }
];

var order = [];

function increaseQuantity(quantityId) {
  var menuItem = menu.find(item => item.menu_id === quantityId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === quantityId);
    if (existingOrderItem) {
      existingOrderItem.quantity++;
    } else {
      var newOrderItem = { ...menuItem };
      order.push(newOrderItem);
    }

    var input = document.getElementById(quantityId);
    input.value = parseInt(input.value) + 1;
  }
  
  console.log(order);
}

function decreaseQuantity(quantityId) {
  var menuItem = menu.find(item => item.menu_id === quantityId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === quantityId);
    if (existingOrderItem) {
      existingOrderItem.quantity--;
      if (existingOrderItem.quantity < 0) {
        existingOrderItem.quantity = 0; 
      }
  
      var input = document.getElementById(quantityId);
      input.value = parseInt(input.value) - 1;
    }
  }
  
  console.log(order);
}

function showMenu(menuId) {
  var menuLists = document.getElementsByClassName('menu-list');
  for (var i = 0; i < menuLists.length; i++) {
    menuLists[i].style.display = 'none';
  }

  var selectedMenu = document.getElementById(menuId);
  if (selectedMenu) {
    selectedMenu.style.display = '';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var floatingButton = document.querySelector('.floating-button');

  floatingButton.addEventListener('click', function () {
    console.log('คุณคลิกปุ่มลอย');
  });
});

function openModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function addToCart(menuId, quantityId) {
  var menuItem = document.getElementById(menuId);
  var quantityInput = document.getElementById(quantityId);

  var itemName = menuItem.querySelector('h3').textContent;
  var itemPrice = menuItem.querySelector('span').textContent;
  var itemQuantity = parseInt(quantityInput.value);

  var cartItem = {
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity
  };

  cartItems.push(cartItem);

  var cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.quantity;
    total += itemTotal;

    var cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';

    var itemNameElement = document.createElement('h3');
    itemNameElement.textContent = item.name;

    var itemQuantityElement = document.createElement('p');
    itemQuantityElement.textContent = 'Quantity: ' + item.quantity;

    var itemTotalElement = document.createElement('p');
    itemTotalElement.textContent = 'Total: $' + itemTotal;

    cartItemElement.appendChild(itemNameElement);
    cartItemElement.appendChild(itemQuantityElement);
    cartItemElement.appendChild(itemTotalElement);

    cartItemsContainer.appendChild(cartItemElement);
  }

  var cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.textContent = total;
}

function createOrderSummary() {
  var orderSummary = '';

  var activeMenu = document.querySelector('.menu-list:not([style="display: none;"])');
  if (activeMenu) {
    var menuItems = activeMenu.querySelectorAll('li');

    menuItems.forEach(function (item) {
      var itemName = item.querySelector('h3').innerText;
      var itemQuantity = item.querySelector('input').value;

      orderSummary += '<div>' + itemName + ': ' + itemQuantity + ' จำนวน</div>';
    });
  }

  return orderSummary;
}

function removeItem(item) {
  var index = cartItems.indexOf(item);
  if (index > -1) {
    cartItems.splice(index, 1);

    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      var itemTotal = cartItems[i].price * cartItems[i].quantity;
      total += itemTotal;
    }

    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var itemTotal = item.price * item.quantity;

      var cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      var itemImage = document.createElement('img');
      itemImage.src = 'menu/กุ้ง/1.jpg';

      var itemDetails = document.createElement('div');
      itemDetails.className = 'cart-item-details';
      var itemName = document.createElement('h3');
      itemName.textContent = item.name;
      var itemQuantity = document.createElement('p');
      itemQuantity.textContent = 'Quantity: ' + item.quantity;
      var itemTotalPrice = document.createElement('p');
      itemTotalPrice.textContent = 'Total: $' + itemTotal;

      itemDetails.appendChild(itemName);
      itemDetails.appendChild(itemQuantity);
      itemDetails.appendChild(itemTotalPrice);

      var itemRemove = document.createElement('div');
      itemRemove.className = 'cart-item-remove';
      var removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = function () {
        removeItem(item);
      };

      itemRemove.appendChild(removeButton);

      cartItem.appendChild(itemImage);
      cartItem.appendChild(itemDetails);
      cartItem.appendChild(itemRemove);

      cartItemsContainer.appendChild(cartItem);
    }

    var cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = total;
  }
}

var tbody = document.getElementById("cart-items");

order.forEach((item, index) => {
  var row = document.createElement("tr");

  var numberCell = document.createElement("td");
  numberCell.textContent = index + 1;
  row.appendChild(numberCell);

  var menuItemCell = document.createElement("td");
  menuItemCell.textContent = item.menu_name;
  row.appendChild(menuItemCell);

  var priceCell = document.createElement("td");
  priceCell.textContent = item.menu_price;
  row.appendChild(priceCell);

  var quantityCell = document.createElement("td");
  quantityCell.textContent = item.quantity;
  row.appendChild(quantityCell);

  var totalCell = document.createElement("td");
  totalCell.textContent = item.menu_price * item.quantity;
  row.appendChild(totalCell);

  var deleteCell = document.createElement("td");
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "ลบ";
  deleteButton.addEventListener("click", () => removeItem(item));
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  tbody.appendChild(row);
});

function increaseQuantity(menuId) {
  var quantityInput = document.getElementById(menuId);
  var currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
  
  // ดำเนินการเพิ่มเมนูเข้าตะกร้าตามเงื่อนไข
  if (menuId === 'F001') {
    // กรณีเมนูที่ 1
    var menuItem = document.getElementById('menu1');
    var itemName = menuItem.querySelector('h3').innerHTML;
    var itemPrice = menuItem.querySelector('span').innerHTML;
    addItemToCart(itemName, itemPrice);
  } else if (menuId === 'F002') {
    // กรณีเมนูที่ 2
    var menuItem = document.getElementById('menu2');
    var itemName = menuItem.querySelector('h3').innerHTML;
    var itemPrice = menuItem.querySelector('span').innerHTML;
    addItemToCart(itemName, itemPrice);
  }
}

function decreaseQuantity(menuId) {
  var quantityInput = document.getElementById(menuId);
  var currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 0) {
    quantityInput.value = currentQuantity - 1;
    
    // ดำเนินการลบเมนูออกจากตะกร้าตามเงื่อนไข
    if (menuId === 'F001') {
      // กรณีเมนูที่ 1
      var itemName = 'กุ้งเผาซีฟูด'; // เปลี่ยนเป็นชื่อเมนูที่ต้องการ
      removeItemFromCart(itemName);
    } else if (menuId === 'F002') {
      // กรณีเมนูที่ 2
      var itemName = 'กุ้งแช่น้ำปลา'; // เปลี่ยนเป็นชื่อเมนูที่ต้องการ
      removeItemFromCart(itemName);
    }
  }
}

// เพิ่มเมนูเข้าตะกร้า
function addItemToCart(itemName, itemPrice) {
  var cartItems = document.getElementById('cart-items');
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>No.</td>
    <td>${itemName}</td>
    <td>${itemPrice}</td>
    <td>1</td>
    <td>${itemPrice}</td>
    <td>
      <button type="button" onclick="removeCartItem('${itemName}')">ลบ</button>
    </td>
  `;
  cartItems.appendChild(newRow);
}

// ลบเมนูออกจากตะกร้า
function removeItemFromCart(itemName) {
  var cartItems = document.getElementById('cart-items');
  var rows = cartItems.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var itemNameCell = row.getElementsByTagName('td')[1];
    if (itemNameCell.innerHTML === itemName) {
      cartItems.removeChild(row);
      break;
    }
  }
}

// เพิ่มเมนูเข้าตะกร้า
function addItemToCart(itemName, itemPrice) {
  var cartItems = document.getElementById('cart-items');
  var rows = cartItems.getElementsByTagName('tr');
  var isDuplicate = false;

  // ตรวจสอบว่าเมนูซ้ำกันหรือไม่
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var itemNameCell = row.getElementsByTagName('td')[1];
    var itemQuantityCell = row.getElementsByTagName('td')[3];
    var itemTotalCell = row.getElementsByTagName('td')[4];

    // ถ้าเมนูซ้ำกันให้บวกจำนวนและราคารวมกัน
    if (itemNameCell.innerHTML === itemName) {
      var quantity = parseInt(itemQuantityCell.innerHTML) + 1;
      var totalPrice = parseFloat(itemTotalCell.innerHTML.substring(1)) + parseFloat(itemPrice.substring(1));
      itemQuantityCell.innerHTML = quantity;
      itemTotalCell.innerHTML = '$' + totalPrice.toFixed(2);
      isDuplicate = true;
      break;
    }
  }

  // ถ้าไม่ซ้ำกันให้เพิ่มแถวใหม่
  if (!isDuplicate) {
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>No.</td>
      <td>${itemName}</td>
      <td>${itemPrice}</td>
      <td>1</td>
      <td>${itemPrice}</td>
      <td>
        <button type="button" onclick="removeCartItem('${itemName}')">ลบ</button>
      </td>
    `;
    cartItems.appendChild(newRow);
  }
}

function increaseQuantity(quantityId) {
  var menuItem = menu.find(item => item.menu_id === quantityId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === quantityId);
    if (existingOrderItem) {
      existingOrderItem.quantity++;
    } else {
      var newOrderItem = { ...menuItem };
      order.push(newOrderItem);
    }

    var input = document.getElementById(quantityId);
    input.value = parseInt(input.value) + 1;

    renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
  }
}

function removeItem(menuId) {
  var index = order.findIndex(item => item.menu_id === menuId);
  if (index !== -1) {
    order.splice(index, 1);
    renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
  }
}

function renderTable() {
  var cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  var total = 0;
  for (var i = 0; i < order.length; i++) {
    var item = order[i];
    var itemTotal = item.menu_price * item.quantity;
    total += itemTotal;

    var cartItemElement = document.createElement('tr');
    cartItemElement.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.menu_name}</td>
      <td>${item.menu_price}</td>
      <td>${item.quantity}</td>
      <td>${itemTotal}</td>
      <td>
        <button type="button" onclick="removeItem('${item.menu_id}')">ลบ</button>
      </td>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  }

  var cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.textContent = total;
}

function decreaseQuantity(quantityId) {
  var menuItem = menu.find(item => item.menu_id === quantityId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === quantityId);
    if (existingOrderItem) {
      existingOrderItem.quantity--;
      if (existingOrderItem.quantity < 0) {
        existingOrderItem.quantity = 0; 
      }

      var input = document.getElementById(quantityId);
      input.value = parseInt(input.value) - 1;
      renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
    }
  }

  console.log(order);
}

function removeItem(menuId) {
  var index = order.findIndex(item => item.menu_id === menuId);
  if (index !== -1) {
    order.splice(index, 1);
    renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
  }
}


var tbody = document.getElementById("cart-items");

order.forEach((item, index) => {
  var row = document.createElement("tr");

  var numberCell = document.createElement("td");
  numberCell.textContent = index + 1;
  row.appendChild(numberCell);

  var menuItemCell = document.createElement("td");
  menuItemCell.textContent = item.menu_name;
  row.appendChild(menuItemCell);

  var priceCell = document.createElement("td");
  priceCell.textContent = item.menu_price;
  row.appendChild(priceCell);

  var quantityCell = document.createElement("td");
  quantityCell.textContent = item.quantity;
  row.appendChild(quantityCell);

  var totalCell = document.createElement("td");
  totalCell.textContent = item.menu_price * item.quantity;
  row.appendChild(totalCell);

  var deleteCell = document.createElement("td");
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "ลบ";
  deleteButton.addEventListener("click", () => removeItem(item.menu_id));
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  tbody.appendChild(row);
});

function increaseQuantity(menuId) {
  var menuItem = menu.find(item => item.menu_id === menuId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === menuId);
    if (existingOrderItem) {
      existingOrderItem.quantity++;
    } else {
      var newOrderItem = { ...menuItem };
      order.push(newOrderItem);
    }

    var input = document.getElementById(menuId);
    input.value = parseInt(input.value) + 1;

    renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
  }
}

function removeItem(menuId) {
  var index = order.findIndex(item => item.menu_id === menuId);
  if (index !== -1) {
    order.splice(index, 1);
    renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
  }
}

function renderTable() {
  var cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  var total = 0;
  for (var i = 0; i < order.length; i++) {
    var item = order[i];
    var itemTotal = item.menu_price * item.quantity;
    total += itemTotal;

    var cartItemElement = document.createElement('tr');
    cartItemElement.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.menu_name}</td>
      <td>${item.menu_price}</td>
      <td>${item.quantity}</td>
      <td>${itemTotal}</td>
      <td>
        <button type="button" onclick="removeItem('${item.menu_id}')">ลบ</button>
      </td>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  }

  var cartTotalElement = document.getElementById('cart-total');
  cartTotalElement.textContent = total;
}

function decreaseQuantity(quantityId) {
  var menuItem = menu.find(item => item.menu_id === quantityId);
  if (menuItem) {
    var existingOrderItem = order.find(item => item.menu_id === quantityId);
    if (existingOrderItem) {
      existingOrderItem.quantity--;
      if (existingOrderItem.quantity < 0) {
        existingOrderItem.quantity = 0; 
      }

      var input = document.getElementById(quantityId);
      input.value = parseInt(input.value) - 1;
      renderTable(); // เรียกใช้ฟังก์ชัน renderTable() เพื่ออัปเดตตารางใหม่
    }
  }
}


