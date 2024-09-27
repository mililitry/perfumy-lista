let products = JSON.parse(localStorage.getItem('productList')) || [];
let shippingOptions = JSON.parse(localStorage.getItem('shippingList')) || [];

function addProduct() {
    const name = document.getElementById('productName').value;
    const availableMl = document.getElementById('availableMl').value;
    const pricePerMl = document.getElementById('pricePerMl').value;

    if (name && availableMl && pricePerMl) {
        products.push({ name, availableMl, pricePerMl });
        displayProducts();
    }
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${product.name} - Dostępne: ${product.availableMl} ml, Cena za ml: ${product.pricePerMl} PLN
            <button onclick="removeProduct(${index})">Usuń</button></p>
        `;
        productList.appendChild(productDiv);
    });
}

function removeProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function addShipping() {
    const method = document.getElementById('shippingMethod').value;
    const cost = document.getElementById('shippingCost').value;

    if (method && cost) {
        shippingOptions.push({ method, cost });
        displayShippingOptions();
    }
}

function displayShippingOptions() {
    const shippingList = document.getElementById('shipping-list');
    shippingList.innerHTML = '';
    shippingOptions.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <p>${option.method} - Koszt: ${option.cost} PLN
            <button onclick="removeShipping(${index})">Usuń</button></p>
        `;
        shippingList.appendChild(optionDiv);
    });
}

function removeShipping(index) {
    shippingOptions.splice(index, 1);
    displayShippingOptions();
}

function saveList() {
    localStorage.setItem('productList', JSON.stringify(products));
    localStorage.setItem('shippingList', JSON.stringify(shippingOptions));
    document.getElementById('saveMessage').innerText = 'Lista została zapisana.';
    displayOrderForm();
}

function displayOrderForm() {
    const orderForm = document.getElementById('order-form');
    orderForm.innerHTML = '';
    products.forEach((product, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <p>${product.name} - Dostępne: ${product.availableMl} ml, Cena za ml: ${product.pricePerMl} PLN
            <label>Ilość ml: </label><input type="number" id="quantity-${index}" min="1" max="${product.availableMl}">
        `;
        orderForm.appendChild(orderDiv);
    });

    const shippingSelect = document.createElement('select');
    shippingSelect.id = 'shippingMethodSelect';
    shippingOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.method;
        optionElement.text = `${option.method} - ${option.cost} PLN`;
        shippingSelect.appendChild(optionElement);
    });
    orderForm.appendChild(shippingSelect);
}

function placeOrder() {
    const buyerName = document.getElementById('buyerName').value;
    let orderSummary = `Zamówienie od: ${buyerName}\n`;

    products.forEach((product, index) => {
        const quantity = document.getElementById(`quantity-${index}`).value;
        if (quantity > 0) {
            orderSummary += `${product.name} - Ilość: ${quantity} ml\n`;
        }
    });

    const selectedShipping = document.getElementById('shippingMethodSelect').value;
    orderSummary += `Wybrana wysyłka: ${selectedShipping}`;

    document.getElementById('orderSummary').innerText = orderSummary;
}
