// Cart functions
function getCart() {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, name, price) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    saveCart(cart);
    showAddedFeedback();
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

function updateQuantity(id, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    saveCart(cart);
    renderCart();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline' : 'none';
    }
}

function showAddedFeedback() {
    const btn = document.querySelector('.add-to-cart');
    if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ Tillagd!';
        btn.style.backgroundColor = '#27AE60';
        setTimeout(() => {
            btn.textContent = original;
            btn.style.backgroundColor = '#1A3A4A';
        }, 1500);
    }
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItems.innerHTML = '';
        return;
    }

    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';

    let total = 0;
    let html = '<div class="list-group mb-4">';

    cart.forEach(item => {
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        const itemTotal = priceNum * item.quantity;
        total += itemTotal;

        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="mb-0 text-muted">${item.price} st</p>
                </div>
                <div class="d-flex align-items-center gap-3">
                    <input type="number" value="${item.quantity}" min="1" 
                        class="form-control" style="width: 70px;"
                        onchange="updateQuantity('${item.id}', this.value)">
                    <span class="fw-bold">${itemTotal} kr</span>
                    <button class="btn btn-sm btn-outline-danger" 
                        onclick="removeFromCart('${item.id}')">Ta bort</button>
                </div>
            </div>`;
    });

    html += '</div>';
    cartItems.innerHTML = html;
    document.getElementById('cart-total').textContent = total + ' kr';
}

function checkout() {
    const cartSummary = document.getElementById('cart-summary');
    const cartItems = document.getElementById('cart-items');
    const checkoutMessage = document.getElementById('checkout-message');

    cartSummary.style.display = 'none';
    cartItems.style.display = 'none';
    checkoutMessage.style.display = 'block';

    sessionStorage.removeItem('cart');
    updateCartCount();
}

// Add to cart button listener
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    const addBtn = document.querySelector('.add-to-cart');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const id = addBtn.dataset.id;
            const name = addBtn.dataset.name;
            const price = addBtn.dataset.price;
            const quantity = parseInt(document.getElementById('quantity')?.value || 1);

            for (let i = 0; i < quantity; i++) {
                addToCart(id, name, price);
            }
        });
    }
});