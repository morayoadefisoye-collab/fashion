// payment.js — handles the dedicated payment checkpoint page
const MERCHANT = {
    name: 'ADEFISOYE ADEMOLA MUZAKIR ISMAIL',
    bank: 'OPAY',
    account: '7083248653',
    note: 'Please send payment referencing your order and email us the receipt.'
};

const $ = (s) => document.querySelector(s);

function getCart() { return JSON.parse(localStorage.getItem('fd_cart') || '[]'); }

// Currency helper: convert USD values to NGN for display
window.EXCHANGE_RATE_USD_TO_NGN = window.EXCHANGE_RATE_USD_TO_NGN || 1100;
function formatPrice(amountUSD){
    const rate = Number(window.EXCHANGE_RATE_USD_TO_NGN) || 1;
    const ngn = (Number(amountUSD) || 0) * rate;
    try{ return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(ngn); }
    catch(e){ return '₦' + ngn.toFixed(2); }
}

function renderMerchant() {
    const m = MERCHANT;
    const el = $('#merchant-box');
    el.innerHTML = `
    <div class="merchant-title">${m.name} — ${m.bank}</div>
    <div class="flex-row" style="margin-top:8px">
      <div class="mono">Acct: <span id="merchant-acct">${m.account}</span></div>
      <button id="copy-acct" class="ghost">Copy</button>
    </div>
    <div style="margin-top:6px">Routing: ${m.routing}</div>
    <div class="muted" style="margin-top:8px;font-size:13px">${m.note}</div>
  `;
    el.querySelector('#copy-acct').onclick = async () => {
        const acct = document.getElementById('merchant-acct').textContent || '';
        try { await navigator.clipboard.writeText(acct); alert('Account number copied'); }
        catch (e) { const ta = document.createElement('textarea'); ta.value = acct; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); alert('Account number copied'); }
    };
}

function renderSummary() {
    const cart = getCart();
    const el = $('#order-summary');
    if (!cart || cart.length === 0) { el.innerHTML = '<div class="muted">Your cart is empty. Go back to <a href="index.html">shopping</a>.</div>'; return; }
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    // Always apply a shipping fee (no free-shipping threshold)
    const shipping = 4.99;
    const total = subtotal + shipping;
    let rows = cart.map(i => `<div class="summary-line"><span>${i.name} x${i.qty}</span><span>${formatPrice(i.price * i.qty)}</span></div>`).join('');
    rows += `<div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="summary-line"><span>Shipping</span><span>${formatPrice(shipping)}</span></div>`;
    rows += `<div class="summary-line" style="font-weight:700"><span>Total</span><span>${formatPrice(total)}</span></div>`;
    el.innerHTML = rows;
}

function init() {
    renderMerchant();
    renderSummary();

    $('#pay-back').onclick = () => { window.location.href = 'cart.html'; };
    $('#pay-place').onclick = () => {
        const confirmed = $('#confirm-paid').checked;
        const email = $('#buyer-email').value.trim();
        const name = $('#buyer-name').value.trim();
        const err = $('#pay-error'); err.classList.add('hidden'); err.textContent = '';
        if (!confirmed) { err.classList.remove('hidden'); err.textContent = 'Please confirm you have sent the payment to the account above.'; return; }
        if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.classList.remove('hidden'); err.textContent = 'If provided, please enter a valid email address.'; return; }

        // Get cart items BEFORE clearing
        const cartItems = getCart();
        if (!cartItems || cartItems.length === 0) { err.classList.remove('hidden'); err.textContent = 'Your cart is empty.'; return; }

        // Calculate totals
        const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
        // Always apply a shipping fee (no free-shipping threshold)
        const shipping = 4.99;
        const total = +(subtotal + shipping).toFixed(2);

        // Generate order ID and timestamp
        const orderId = 'FD-' + Date.now().toString(36).toUpperCase();
        const now = new Date();
        $('#receipt-date').textContent = now.toLocaleString();

        // Build receipt line items
        let itemsHtml = cartItems.map(i => {
            return `<div class="summary-line"><span>${i.name} x${i.qty}</span><span>${formatPrice(i.price * i.qty)}</span></div>`;
        }).join('');
        itemsHtml += `<div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>`;
        itemsHtml += `<div class="summary-line"><span>Shipping</span><span>${formatPrice(shipping)}</span></div>`;
        itemsHtml += `<div class="summary-line" style="font-weight:700"><span>Total</span><span>${formatPrice(total)}</span></div>`;

        // Build full receipt
        const receiptHtml = `
      <div><strong>Order ID:</strong> ${orderId}</div>
      <div><strong>Buyer:</strong> ${name || '—'} ${email ? ' / ' + email : ''}</div>
      <div style="margin-top:8px">${itemsHtml}</div>
      <div style="margin-top:10px"><strong>Paid to:</strong> ${MERCHANT.name} — ${MERCHANT.bank}</div>
      <div class="mono" style="margin-top:4px">Acct: ${MERCHANT.account} • Routing: ${MERCHANT.routing}</div>
    `;
        $('#receipt-body').innerHTML = receiptHtml;

        // Clear cart and show confirmation + receipt
        localStorage.removeItem('fd_cart');
        $('#confirmation-text').textContent = `Order ${orderId} recorded. Keep proof of payment.`;
        $('#confirmation').classList.remove('hidden');

        // Hide the form area by adding hidden class
        document.querySelectorAll('#merchant-box, #order-summary, #confirm-paid, #buyer-email, #buyer-name, #pay-place, #pay-back').forEach(n => { if (n) n.classList.add('hidden'); });

        // Show receipt and wire print button
        const receiptEl = $('#receipt');
        receiptEl.classList.remove('hidden');
        receiptEl.setAttribute('aria-hidden', 'false');
        $('#print-receipt').onclick = () => { window.print(); };
    };

    $('#confirm-done').onclick = () => { window.location.href = 'index.html'; };
}

document.addEventListener('DOMContentLoaded', init);