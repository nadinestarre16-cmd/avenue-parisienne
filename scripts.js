// Basic UI helpers
(function(){
  // Language toggle (EN/AR) – simple content swap based on data-lang attributes
  const langButtons = document.querySelectorAll('.lang-btn');
  const translations = {
    en: document.querySelectorAll('[data-lang="en"]'),
    ar: document.querySelectorAll('[data-lang="ar"]')
  };

  function applyLang(lang){
    // Show English or Arabic blocks
    if(lang === 'ar'){
      translations.en.forEach(el => el.style.display = 'none');
      translations.ar.forEach(el => el.style.display = 'block');
      document.documentElement.setAttribute('dir','rtl');
    } else {
      translations.en.forEach(el => el.style.display = 'block');
      translations.ar.forEach(el => el.style.display = 'none');
      document.documentElement.setAttribute('dir','ltr');
    }
    // Update aria-pressed
    langButtons.forEach(btn => btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true':'false'));
  }

  // initialize
  applyLang('en');
  langButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      applyLang(btn.dataset.lang);
    });
  });

  // Simple smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();

// Cart functionality (side-cart)
(function(){
  const cartToggle = document.getElementById('cartToggle');
  const sideCart = document.getElementById('sideCart');
  const cartClose = document.getElementById('cartClose');
  const cartContent = document.getElementById('cartContent');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const emptyCart = document.getElementById('emptyCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const productGrid = document.getElementById('productGrid');

  let cart = [];

  function renderCart(){
    cartContent.innerHTML = '';
    if(cart.length === 0){
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'Your cart is empty.';
      cartContent.appendChild(p);
      emptyCart.style.display = 'block';
      cartSubtotal.textContent = '﷼0';
      checkoutBtn.disabled = true;
      return;
    }
    let subtotal = 0;
    cart.forEach((item, idx)=>{
      const div = document.createElement('div');
      div.style.display='flex';
      div.style.justifyContent='space-between';
      div.style.alignItems='center';
      div.style.padding='6px 0';
      const name = document.createElement('span');
      name.textContent = item.name;
      const price = document.createElement('span');
      price.textContent = '﷼' + Number(item.price).toLocaleString();
      div.appendChild(name);
      div.appendChild(price);
      cartContent.appendChild(div);
      subtotal += Number(item.price);
    });
    cartSubtotal.textContent = '﷼' + subtotal.toLocaleString();
    emptyCart.style.display = 'none';
    checkoutBtn.disabled = false;
  }

  function addToCart(productId, productName, price){
    cart.push({id: productId, name: productName, price: price});
    renderCart();
    // Show side cart
    sideCart.classList.add('active');
  }

  cartToggle.addEventListener('click', ()=> sideCart.classList.add('active'));
  cartClose.addEventListener('click', ()=> sideCart.classList.remove('active'));

  // Attach handlers to all "Add to Bag" buttons
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const price = btn.dataset.price;
      const name = btn.closest('.product-card').querySelector('.product-title').textContent;
      addToCart(id, name, price);
    });
  });

  // Close cart when clicking outside (optional UX)
  document.addEventListener('click', (e)=>{
    if(!sideCart.contains(e.target) && !cartToggle.contains(e.target)){
      // optional: close on outer click
      // sideCart.classList.remove('active');
    }
  });

  // Initialize
  renderCart();
})();