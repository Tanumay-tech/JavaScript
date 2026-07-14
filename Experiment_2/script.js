// EXPERIMENT 2 LOGIC

// 1. Using 'const' - Value cannot be reassigned. Perfect for arrays holding state or fixed rates.
const cart = [];
const TAX_RATE = 0.18; // 18% GST

// 2. Using 'var' - Function-scoped (older way of declaring variables, demonstrated for syllabus requirements)
var shopName = "SIT Tech Store"; 

function addItem() {
    // 3. Using 'let' - Block-scoped variables. Used for values we extract temporarily.
    let name = document.getElementById("itemName").value;
    let price = parseFloat(document.getElementById("itemPrice").value);
    let qty = parseInt(document.getElementById("itemQty").value);

    // Basic validation
    if (!name || isNaN(price) || isNaN(qty) || price <= 0 || qty <= 0) {
        alert("Please enter valid item details.");
        return;
    }

    // Creating an object and pushing it to the const array
    let itemObject = {
        itemName: name,
        itemPrice: price,
        itemQty: qty
    };
    
    cart.push(itemObject);
    
    // Clear inputs after adding
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQty").value = "";
    
    console.log("Item added:", itemObject);
    alert(`${name} added to cart!`); // Quick template literal usage
}

function generateBill() {
    if (cart.length === 0) {
        document.getElementById("bill-output").innerText = "Cart is empty. Please add items.";
        return;
    }

    let subTotal = 0;
    
    // 4. TEMPLATE LITERALS (`...`) - Allow multi-line strings and embedded expressions ${}
    let billText = `----------------------------------------\n`;
    billText += `          ${shopName.toUpperCase()}          \n`;
    billText += `----------------------------------------\n`;
    billText += `Item            Qty      Price      Total\n`;
    billText += `----------------------------------------\n`;

    // Loop through cart
    for (let i = 0; i < cart.length; i++) {
        
        // 5. DESTRUCTURING - Extracting properties from an object into distinct variables neatly
        const { itemName, itemPrice, itemQty } = cart[i];
        
        let itemTotal = itemPrice * itemQty;
        subTotal += itemTotal;

        // Formatting each line using template literals
        // padEnd() ensures columns align neatly in the monospace font
        billText += `${itemName.padEnd(15)} ${itemQty.toString().padEnd(8)} ₹${itemPrice.toString().padEnd(9)} ₹${itemTotal}\n`;
    }

    let taxAmount = subTotal * TAX_RATE;
    let grandTotal = subTotal + taxAmount;

    billText += `----------------------------------------\n`;
    billText += `Subtotal:                      ₹${subTotal.toFixed(2)}\n`;
    billText += `GST (18%):                     ₹${taxAmount.toFixed(2)}\n`;
    billText += `----------------------------------------\n`;
    billText += `GRAND TOTAL:                   ₹${grandTotal.toFixed(2)}\n`;
    billText += `----------------------------------------\n`;
    billText += `      Thank you for shopping with us!      `;

    // Displaying the final text
    document.getElementById("bill-output").innerText = billText;
}