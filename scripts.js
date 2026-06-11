// Product data
const products = [
  {
    id: 1,
    name: 'Storm City Set',
    description: '100% Tencel blend',
    price: 14250,
    image: 'https://images.unsplash.com/photo-1595777707802-0b4e5f92d4f5?w=500&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'The Blazer Abaya',
    description: 'Pure modal, European tailoring',
    price: 15750,
    image: 'https://images.unsplash.com/photo-1495222707578-eb1d3be6f304?w=500&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Oversized Poplin Shirt',
    description: '100% organic cotton',
    price: 4950,
    image: 'https://images.unsplash.com/photo-1551605016-27c2682c8f8c?w=500&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'Layered Maxi Skirt',
    description: 'Pure linen with bamboo slip',
    price: 13500,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop'
  },
  {
    id: 5,
    name: 'Premium Headscarf Palette',
    description: '100% modal & Tencel',
    price: 4313,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop'
  },
  {
    id: 6,
    name: 'Premium Headscarf - Ivory',
    description: 'Silk-grade Tencel',
    price: 4313,
    image: 'https://images.unsplash.com/photo-1594398200624-776e718cc996?w=500&h=600&fit=crop'
  },
  {
    id: 7,
    name: 'Premium Headscarf - Taupe',
    description: 'Pure modal blend',
    price: 4313,
    image: 'https://images.unsplash.com/photo-1595909418860-3e42d4a609e0?w=500&h=600&fit=crop'
  },
  {
    id: 8,
    name: 'Premium Headscarf - Gold',
    description: 'European heritage',
    price: 4313,
    image: 'https://images.unsplash.com/photo-1535205557871-1a104193d305?w=500&h=600&fit=crop'
  }
];

let cart = [];

// Render products
function renderProducts() {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = products
    .map(
      (product) => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <h4 class="product-name">${product.name}</h4>
        <p class="product-description">${product.description}</p>
        <div class="product-price">﷼${product.price.toLocaleString('en-US')}</div>
        <button class="product-add-btn" onclick="addToCart(${product.id})">
          Add to Bag
        </button>
      </div>
    </div>
  `
    )
    .join('');
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartUI();
    openCart();
  }
}

// Update cart UI
function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your bag is empty</p>';
    cartSubtotal.textContent = '﷼0';
    checkoutBtn.disabled = true;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">﷼${item.price.toLocaleString('en-US')}</span>
      </div>
    `
      )
      .join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    cartSubtotal.textContent = '﷼' + subtotal.toLocaleString('en-US');
    checkoutBtn.disabled = false;
  }
}

// Open/close cart
function openCart() {
  document.getElementById('cartSidebar').classList.add('active');
  document.getElementById('overlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

// Event listeners
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Proceeding to checkout with ' + cart.length + ' items');
});

// Initialize
renderProducts();
updateCartUI();