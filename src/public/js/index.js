const socket = io();

socket.on('updateProducts', (products) => {
    const list = document.getElementById('productList');
    list.innerHTML = "";
    products.forEach(p => {
        list.innerHTML += `
            <div>
                <p><strong>${p.title}</strong> - $${p.price}</p>
                <button onclick="deleteProduct(${p.id})">Eliminar</button>
            </div>`;
    });
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };

    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' }
    });
});

function deleteProduct(id) {
    fetch(`/api/products/${id}`, { method: 'DELETE' });
}