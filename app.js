let products = [];
let shippingOptions = [];

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
    const listData = { products, shippingOptions };
    const listJson = JSON.stringify(listData);
    localStorage.setItem('productList', listJson);

    const randomId = Math.random().toString(36).substr(2, 9);
    const uniqueUrl = `https://mililitry.github.io/perfumy-lista/${randomId}`;

    document.getElementById('generatedLink').innerText = `Twoja lista jest dostępna pod adresem: ${uniqueUrl}`;
}
