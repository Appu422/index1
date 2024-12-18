const foodItems = [
    { id: 1, name: 'Pizza', price: 30, image: 'https://img.freepik.com/free-photo/delicious-pizza-studio_23-2151846554.jpg' },
    { id: 2, name: 'Burger', price: 35, image: 'https://img.freepik.com/free-photo/big-sandwich-hamburger-burger-with-beef-red-onion-tomato-fried-bacon_2829-5398.jpg' },
    { id: 3, name: 'Pasta', price: 39, image: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg' },
    { id: 4, name: 'Sushi', price: 50, image: 'https://img.freepik.com/free-photo/maki-sushi-isolated-white_2829-7304.jpg' },
    { id: 5, name: 'Salad', price: 59, image: 'https://img.freepik.com/free-photo/top-view-tasty-salad-with-vegetables_23-2148515491.jpg' },
    { id: 6, name: 'Tacos', price: 79, image: 'https://img.freepik.com/free-photo/mexican-tacos-with-chicken-bell-peppers-black-beans-fresh-vegetables_2829-20049.jpg' },
    { id: 7, name: 'Steak', price: 20, image: 'https://img.freepik.com/free-photo/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables_2829-18665.jpg' },
    { id: 8, name: 'Ice Cream', price: 55, image: 'https://img.freepik.com/free-photo/coold-sweet-ice-cream-with-chocolate_144627-7297.jpg' },
    { id: 9, name: 'Sandwich', price: 60, image: 'https://img.freepik.com/free-photo/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg' },
    { id: 10, name: 'Fries', price: 30, image: 'https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg' }
];

let users = [];a
let totalPrice = 0; // Initialize total price
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || []; // Load order history from localStorage

function displayFoodItems() {
    const foodContainer = document.querySelector('.food-items');
    foodContainer.innerHTML = ''; // Clear previous items
    foodItems.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');
        foodDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        foodContainer.appendChild(foodDiv);
    });
}

function addToCart(id) {
    const cartContainer = document.querySelector('.cart-items');
    const item = foodItems.find(food => food.id === id);
    
    // Update total price
    totalPrice += item.price;

    const cartDiv = document.createElement('div');
    cartDiv.classList.add('cart-item');
    cartDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
    `;
    cartContainer.appendChild(cartDiv);

    // Update total price display
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceContainer = document.querySelector('.total-price');
    totalPriceContainer.innerHTML = `Total Price: $${totalPrice}`;
}

function locationFunction() {
    alert('Location button clicked');
}

function contactFunction() {
    alert('Contact button clicked');
}

function filterItems(maxPrice) {
    const filteredItems = foodItems.filter(item => item.price < maxPrice);
    displayFoodItems(filteredItems);
}

function sortItems(order) {
    const sortedItems = [...foodItems].sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    displayFoodItems(sortedItems);
}

function checkoutFunction() {
    if (totalPrice === 0) {
        alert('Your cart is empty!');
        return;
    }

    const order = {
        username: document.getElementById('userName').textContent,
        items: [...document.querySelectorAll('.cart-item h3')].map(item => item.textContent),
        totalPrice: totalPrice,
        date: new Date().toLocaleString(),
    };

    // Save order to order history
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    alert(`Your order has been placed! Total Price: $${totalPrice}. Your order will be delivered within 30 minutes.`);
    
    // Reset total price and cart
    totalPrice = 0;
    document.querySelector('.cart-items').innerHTML = '';
    updateTotalPrice();
    displayOrderHistory();
}

function displayOrderHistory() {
    const historyContainer = document.querySelector('.history-items');
    historyContainer.innerHTML = ''; // Clear previous history

    orderHistory.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <p><strong>User:</strong> ${order.username}</p>
            <p><strong>Items:</strong> ${order.items.join(', ')}</p>
            <p><strong>Total Price:</strong> $${order.totalPrice}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <hr>
        `;
        historyContainer.appendChild(order)
