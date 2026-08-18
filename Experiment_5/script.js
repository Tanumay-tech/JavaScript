const cart = [];
const discountRates = {
    'SAVE10': 0.10,
    'SAVE20': 0.20
};

function addToCart() {
    const nameInput = document.getElementById("itemName");
    const priceInput = document.getElementById("itemPrice");
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name === "" || isNaN(price) || price <= 0) {
        alert("Please enter valid item details.");
        return;
    }

    const item = { id: Date.now(), name: name, price: price };
    cart.push(item);
    
    nameInput.value = "";
    priceInput.value = "";
    
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";
    
    cart.map(item => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.name}</span> <span>₹${item.price.toFixed(2)}</span>`;
        list.appendChild(li);
    });
}

function calculateTotal() {
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const subTotal = cart.reduce((acc, currentItem) => acc + currentItem.price, 0);
    const codeInput = document.getElementById("discountCode").value.trim().toUpperCase();
    
    let discountMultiplier = 0;
    if (discountRates.hasOwnProperty(codeInput)) {
        discountMultiplier = discountRates[codeInput];
    }

    const discountAmount = subTotal * discountMultiplier;
    const finalTotal = subTotal - discountAmount;

    const summaryBox = document.getElementById("summary");
    summaryBox.style.display = "block";
    summaryBox.innerHTML = `
        <strong>Subtotal:</strong> ₹${subTotal.toFixed(2)}<br>
        <strong>Discount Applied:</strong> ₹${discountAmount.toFixed(2)}<br>
        <strong>Final Amount:</strong> ₹${finalTotal.toFixed(2)}
    `;
}