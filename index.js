// Minimal demo interactivity for Fashion District
// - Simulated auth using localStorage
// - Renders products, cart behavior

const products = window.PRODUCTS || [];

// Currency & formatting helper — display amounts in Nigerian Naira (NGN)
// Configure `window.EXCHANGE_RATE_USD_TO_NGN` to adjust conversion rate.
window.EXCHANGE_RATE_USD_TO_NGN = window.EXCHANGE_RATE_USD_TO_NGN || 1100; // default rate (editable)
function formatPrice(amountUSD){
    const rate = Number(window.EXCHANGE_RATE_USD_TO_NGN) || 1;
    const ngn = amountUSD * rate;
    try{
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(ngn);
    }catch(e){
        return '₦' + ngn.toFixed(2);
    }
}

// (Search helpers implemented lower in the file: getSuggestions / showSuggestions)

// Categories booth (Temu-like) — key, label, emoji/icon
const CATEGORIES = [
    { key: 'all', label: 'All', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M7 7V5a5 5 0 0110 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'clothes', label: 'Clothes', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3l2 2 2-1 2 1 2-2 2 1v4l-2 2v8H8v-8L6 7V3z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'shoes', label: 'Shoes', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13c0-2 2-3 5-3h7l3 2v3c0 1-1 2-3 2H6c-2 0-3-1-3-4z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'caps', label: 'Hats', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12c2-4 10-6 20-1-4 3-6 4-10 4-4 0-8-1-10-3z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'eyewear', label: 'Eyewear', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="12" r="3" stroke="currentColor" stroke-width="1.2"/><circle cx="17" cy="12" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M10 12h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' },
    { key: 'accessories', label: 'Accessories', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" stroke="currentColor" stroke-width="1" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'bags', label: 'Bags', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 7v10a2 2 0 002 2h8a2 2 0 002-2V7H6z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><path d="M9 7V6a3 3 0 016 0v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'beauty', label: 'Beauty', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><rect x="9" y="9" width="6" height="10" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>' },
    { key: 'office', label: 'Office', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M8 3v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M16 3v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>' },
    { key: 'automotive', label: 'Automotive', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l1-3h16l1 3v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/><circle cx="7.5" cy="16.5" r="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="17.5" cy="16.5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>' },
    { key: 'crafts', label: 'Crafts', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" stroke="currentColor" stroke-width="1" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'household', label: 'Household', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10l9-6 9 6v8a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1v-8z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'partydecorations', label: 'Party Decorations', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M20 4l-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="14" r="3" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>' },
    { key: 'fabric', label: 'Fabrics', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6c3 0 6-2 9-2s6 2 9 2v12c-3 0-6 2-9 2s-6-2-9-2V6z" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/></svg>' },
    { key: 'tools', label: 'Tools', iconSVG: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 3l7 7-4 4-7-7v-4l4-0zM3 21l6-6" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
];

function renderCategoriesBooth(activeKey = 'all') {
    const grid = document.getElementById('categories-grid'); if (!grid) return;
    grid.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const it = document.createElement('div'); it.className = 'category-item'; it.dataset.cat = cat.key;
        if (cat.key === activeKey) it.classList.add('active');
        const iconHtml = cat.iconSVG ? cat.iconSVG : `<div class="emoji-icon">${(cat.icon || '')}</div>`;
        it.innerHTML = `<div class="category-icon">${iconHtml}</div><div class="category-label">${cat.label}</div>`;
        it.addEventListener('click', () => {
            // mark active
            document.querySelectorAll('.category-item').forEach(x => x.classList.remove('active'));
            it.classList.add('active');
            // sync with top category buttons if present
            const top = document.querySelectorAll('.cat-btn');
            if (top && top.length) top.forEach(b => { b.classList.toggle('active', b.dataset.cat === cat.key); });
            // render products for category
            renderProducts(cat.key, '');
            // scroll to products
            const productsSection = document.getElementById('products-section'); if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        grid.appendChild(it);
    });
}

// Populate the small-screen select control and wire its change events
function populateCategorySelect() {
    const sel = document.getElementById('cat-select'); if (!sel) return;
    sel.innerHTML = '';
    CATEGORIES.forEach(cat => {
        const opt = document.createElement('option'); opt.value = cat.key; opt.textContent = cat.label; sel.appendChild(opt);
    });
    sel.value = 'all';
    sel.addEventListener('change', (e) => {
        const key = e.target.value;
        // sync top buttons
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === key));
        // sync booth items
        document.querySelectorAll('.category-item').forEach(it => it.classList.toggle('active', it.dataset.cat === key));
        const q = $('#search-input') ? $('#search-input').value || '' : '';
        renderProducts(key, q);
    });
}

// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// (currency formatting implemented at the top of the file)

// --- Search suggestions / main-goods helper ---
function getSuggestions(q, limit = 6) {
    if (!q) return [];
    const s = q.trim().toLowerCase();
    // simple boosting: name startsWith > name includes > desc includes
    const exact = [];
    const incl = [];
    const desc = [];
    for (const p of products) {
        const name = (p.name || '').toLowerCase();
        const descTxt = (p.desc || '').toLowerCase();
        if (name.startsWith(s)) exact.push(p);
        else if (name.includes(s)) incl.push(p);
        else if (descTxt.includes(s)) desc.push(p);
    }
    const merged = exact.concat(incl, desc);
    // unique by id
    const uniq = [];
    const seen = new Set();
    for (const it of merged) { if (!seen.has(it.id)) { seen.add(it.id); uniq.push(it); } if (uniq.length >= limit) break; }
    return uniq;
}

function showSuggestions(q) {
    const box = $('#search-suggestions'); if (!box) return; box.innerHTML = '';
    const list = getSuggestions(q, 8);
    if (list.length === 0) { box.innerHTML = `<div class="muted item">No matching goods</div>`; box.classList.remove('hidden'); return; }
    list.forEach(p => {
        const el = document.createElement('div'); el.className = 'item'; el.setAttribute('role', 'option');
        el.dataset.id = p.id; el.dataset.name = p.name;
        el.innerHTML = `<div><strong>${p.name}</strong></div><div class="muted">${p.category} · ${formatPrice(p.price)}</div>`;
        // use mousedown to avoid losing focus before click
        el.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            const qv = el.dataset.name || el.textContent;
            $('#search-input').value = qv;
            hideSuggestions();
            // perform search by name
            renderProducts('all', qv);
        });
        box.appendChild(el);
    });
    box.classList.remove('hidden');
}

function hideSuggestions() { const box = $('#search-suggestions'); if (box) box.classList.add('hidden'); }

// keyboard navigation for suggestions
let _suggestIndex = -1;
function moveSuggestion(dir) {
    const items = Array.from(document.querySelectorAll('#search-suggestions .item'));
    if (!items.length) return;
    _suggestIndex = Math.max(0, Math.min(items.length - 1, (_suggestIndex + dir)));
    items.forEach((it, i) => it.classList.toggle('active', i === _suggestIndex));
}

// --- Auth ---
function showAuthOverlay() { document.getElementById('auth-overlay').classList.remove('hidden'); }
function hideAuthOverlay() { document.getElementById('auth-overlay').classList.add('hidden'); }

function currentUser() { return JSON.parse(localStorage.getItem('fd_user') || 'null'); }

function signup(name, email, password) {
    // naive demo: store user object in localStorage
    const user = { name, email, password };
    localStorage.setItem('fd_user', JSON.stringify(user));
    return user;
}

function login(email, password) {
    const user = currentUser();
    if (!user) { return { ok: false, msg: 'No account found. Please sign up.' }; }
    if (user.email === email && user.password === password) return { ok: true, user };
    return { ok: false, msg: 'Incorrect credentials.' };
}

// --- Products & Cart ---
function renderProducts(filter = 'all', query = '') {
    const grid = $('#products-grid'); grid.innerHTML = '';
    const q = query.trim().toLowerCase();
    const list = products.filter(p => {
        const passCat = filter === 'all' ? true : p.category === filter;
        const passQ = !q || (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
        return passCat && passQ;
    });
    if (list.length === 0) { grid.innerHTML = '<div class="muted">No products found.</div>'; return; }
    list.forEach(p => {
        const card = document.createElement('div'); card.className = 'card'; card.dataset.id = p.id;
                card.innerHTML = `
            <div class="thumb" style="background-image:url('${p.img}')"></div>
            <h4>${p.name}</h4>
            <div class="meta">${p.desc}</div>
            <div class="card-row">
                <div class="muted">${formatPrice(p.price)}</div>
                <button class="primary add" data-id="${p.id}">Add</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function getCart() { return JSON.parse(localStorage.getItem('fd_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('fd_cart', JSON.stringify(cart)); }

function addToCart(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) item.qty += 1; else { const p = products.find(x => x.id === id); cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 }); }
    saveCart(cart); updateCartUI();
}

function removeFromCart(id) {
    let cart = getCart(); cart = cart.filter(i => i.id !== id); saveCart(cart); updateCartUI();
}

function updateCartUI() {
    const cart = getCart();
    $('#cart-count').textContent = cart.reduce((s, i) => s + i.qty, 0);
    const items = $('#cart-items'); items.innerHTML = '';
    let total = 0;
    cart.forEach(i => {
        total += i.price * i.qty;
        const el = document.createElement('div'); el.className = 'cart-item';
                el.innerHTML = `
            <div class="ci-thumb" style="background-image:url('${i.img}')"></div>
            <div class="ci-info">
                <div>${i.name}</div>
                <div class="muted">${i.qty} × ${formatPrice(i.price)}</div>
            </div>
            <div><button class="ghost remove" data-id="${i.id}">✕</button></div>
        `;
        items.appendChild(el);
    });
        $('#cart-total').textContent = `Total: ${formatPrice(total)}`;
}

// --- Wire up DOM events ---
document.addEventListener('DOMContentLoaded', () => {
    // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    // initial render
    renderCategoriesBooth();
    // populate small-screen select that mirrors the top buttons
    populateCategorySelect();
    renderProducts(); updateCartUI(); showUserInHeader();

    // auth modal tabs
    $('#show-login').addEventListener('click', () => { $('#show-login').classList.add('active'); $('#show-signup').classList.remove('active'); $('#login-form').classList.remove('hidden'); $('#signup-form').classList.add('hidden'); });
    $('#show-signup').addEventListener('click', () => { $('#show-signup').classList.add('active'); $('#show-login').classList.remove('active'); $('#signup-form').classList.remove('hidden'); $('#login-form').classList.add('hidden'); });

    // open auth overlay (header button)
    $('#auth-btn').addEventListener('click', () => { document.getElementById('auth-overlay').classList.remove('hidden'); });

    // logout
    $('#logout-btn').addEventListener('click', () => { localStorage.removeItem('fd_user'); showUserInHeader(); alert('You have been logged out.'); document.getElementById('auth-overlay').classList.remove('hidden'); });

    // start shop button hides overlay if logged in and scrolls to products
    $('#start-shop').addEventListener('click', () => {
        if (currentUser()) {
            hideAuthOverlay();
            // Scroll to products section smoothly
            const productsSection = $('#products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            showAuthOverlay();
        }
    });

    // signup
    $('#signup-btn').addEventListener('click', () => {
        const name = $('#signup-name').value.trim(); const email = $('#signup-email').value.trim(); const pass = $('#signup-password').value;
        if (!name || !email || !pass) { alert('Please fill all fields.'); return; }
        signup(name, email, pass); alert('Account created — you are now logged in.'); hideAuthOverlay(); showUserInHeader();
    });

    // login
    $('#login-btn').addEventListener('click', () => {
        const email = $('#login-email').value.trim(); const pass = $('#login-password').value;
        const res = login(email, pass);
        if (!res.ok) { alert(res.msg); return; }
        alert('Welcome back!'); hideAuthOverlay(); showUserInHeader();
    });

    // category buttons
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            const cat = b.dataset.cat;
            const q = $('#search-input').value || '';
            renderProducts(cat, q);
        });
    });

    // search
    const searchInput = $('#search-input');
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value || '';
        const active = document.querySelector('.cat-btn.active');
        const cat = active ? active.dataset.cat : 'all';
        // show suggestions for main goods
        if (q.length >= 2) showSuggestions(q); else hideSuggestions();
        renderProducts(cat, q);
    });
    // keyboard handlers
    searchInput.addEventListener('keydown', (e) => {
        const box = $('#search-suggestions');
        const items = box ? box.querySelectorAll('.item') : [];
        if (e.key === 'ArrowDown') { e.preventDefault(); _suggestIndex = Math.min(items.length - 1, _suggestIndex + 1); moveSuggestion(0); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); _suggestIndex = Math.max(0, _suggestIndex - 1); moveSuggestion(0); }
        else if (e.key === 'Enter') {
            if (items && items.length && _suggestIndex >= 0) { const sel = items[_suggestIndex]; if (sel) { const qv = sel.dataset.name || sel.textContent; searchInput.value = qv; hideSuggestions(); renderProducts('all', qv); _suggestIndex = -1; e.preventDefault(); } }
            // otherwise let Enter trigger default which already filters
        } else if (e.key === 'Escape') { hideSuggestions(); _suggestIndex = -1; }
    });
    // click outside closes suggestions
    document.addEventListener('click', (ev) => { if (!ev.target.closest || !ev.target.closest('.search-wrapper')) hideSuggestions(); });

    // product add/remove/cart interactions
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.add')) {
            const id = Number(e.target.dataset.id); addToCart(id);
        }
        if (e.target.matches('.remove')) {
            const id = Number(e.target.dataset.id); removeFromCart(id);
        }
        if (e.target.id === 'cart-btn') {
            // navigate to dedicated cart page where all selections are managed
            window.location.href = 'cart.html';
        }
        // open product modal when clicking card image or title
        const card = e.target.closest && e.target.closest('.card');
        if (card && !e.target.matches('.add')) {
            const pid = Number(card.dataset.id);
            if (pid) openProductModal(pid);
        }
        if (e.target.id === 'checkout-btn') {
            alert('Checkout is a demo. Thank you!'); localStorage.removeItem('fd_cart'); updateCartUI();
        }
    });

    // If user exists, hide overlay
    if (currentUser()) hideAuthOverlay(); else document.getElementById('auth-overlay').classList.remove('hidden');
});

// --- Product modal ---
function openProductModal(id) {
    const p = products.find(x => x.id === id); if (!p) return;
    $('#pm-image').style.backgroundImage = `url('${p.img}')`;
    $('#pm-name').textContent = p.name;
    $('#pm-desc').textContent = p.desc;
    $('#pm-price').textContent = formatPrice(p.price);
    $('#pm-qty').value = 1;
    document.getElementById('product-modal').classList.remove('hidden');
    // attach add behavior
    $('#pm-add').onclick = () => { const q = Math.max(1, Number($('#pm-qty').value || 1)); addToCartWithQty(p.id, q); document.getElementById('product-modal').classList.add('hidden'); };
}
function closeProductModal() { document.getElementById('product-modal').classList.add('hidden'); }
$('#pm-close').addEventListener('click', closeProductModal);

function addToCartWithQty(id, qty) {
    const cart = getCart(); const item = cart.find(i => i.id === id);
    if (item) item.qty += qty; else { const p = products.find(x => x.id === id); cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: qty, desc: p.desc }); }
    saveCart(cart); updateCartUI();
}

function showUserInHeader() {
    const user = currentUser();
    if (user) {
        $('#auth-btn').classList.add('hidden');
        $('#user-name').classList.remove('hidden'); $('#user-name').textContent = user.name || user.email;
        $('#logout-btn').classList.remove('hidden');
    } else {
        $('#auth-btn').classList.remove('hidden');
        $('#user-name').classList.add('hidden'); $('#user-name').textContent = '';
        $('#logout-btn').classList.add('hidden');
    }
}
