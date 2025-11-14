// cart.js — renders full cart page and recommendations
const productsCatalog = [
  {id:1,category:'clothes',name:'Silk Satin Dress Fabric',desc:'Lustrous silk satin — 44" width',price:18.5,img:'https://images.unsplash.com/photo-1520975911926-6f79d93d9b31?auto=format&fit=crop&w=800&q=60'},
  {id:2,category:'clothes',name:'Organic Cotton',desc:'Soft cotton ideal for shirts and dresses',price:7.99,img:'https://images.unsplash.com/photo-1534751516642-a1af1ef0f3ca?auto=format&fit=crop&w=800&q=60'},
  {id:3,category:'clothes',name:'Wool Blend Suiting',desc:'Warm wool blend — suiting weight',price:20.0,img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60'},
  {id:4,category:'shoes',name:'Leather Sneaker Upper',desc:'Premium leather for sneaker production',price:22.0,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},
  {id:5,category:'shoes',name:'Suede Trim',desc:'Suede pieces for heels and boots',price:6.0,img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60'},
  {id:6,category:'caps',name:'Snapback Cap',desc:'Structured snapback style cap',price:12.5,img:'https://images.unsplash.com/photo-1531346715088-2f3c2b3b1d44?auto=format&fit=crop&w=800&q=60'},
  {id:7,category:'accessories',name:'Leather Belt',desc:'Full-grain leather belt',price:15.0,img:'https://images.unsplash.com/photo-1600180758890-0e6a08a4b3d5?auto=format&fit=crop&w=800&q=60'},
  {id:8,category:'eyewear',name:'Classic Sunglasses',desc:'Timeless square sunglasses frame',price:24.99,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:9,category:'accessories',name:'Lace Trim',desc:'Delicate lace for finishing',price:4.5,img:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60'},
  {id:10,category:'clothes',name:'Chiffon',desc:'Lightweight chiffon for drape',price:9.25,img:'https://images.unsplash.com/photo-1508898578281-774ac4893a37?auto=format&fit=crop&w=800&q=60'},
  {id:11,category:'clothes',name:'Denim Twill',desc:'Classic denim for jeans and jackets',price:13.5,img:'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=60'},
  {id:12,category:'clothes',name:'Linen',desc:'Breathable linen for summer wear',price:11.0,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:13,category:'clothes',name:'Velvet',desc:'Soft stretch velvet — evening wear',price:17.0,img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60'},
  {id:14,category:'shoes',name:'Rubber Soles',desc:'Durable rubber soles for streetwear',price:8.5,img:'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60'},
  {id:15,category:'shoes',name:'Canvas Upper',desc:'Versatile canvas for loafers and sneakers',price:5.5,img:'https://images.unsplash.com/photo-1526178619227-0533f3b2b6c7?auto=format&fit=crop&w=800&q=60'},
  {id:16,category:'caps',name:'Dad Cap',desc:'Soft unstructured dad cap',price:9.0,img:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60'},
  {id:17,category:'accessories',name:'Buttons Pack',desc:'Assorted buttons for tailoring',price:3.5,img:'https://images.unsplash.com/photo-1615398194129-0b4f0a1f8d9b?auto=format&fit=crop&w=800&q=60'},
  {id:18,category:'eyewear',name:'Reading Glasses',desc:'Lightweight reading frames',price:19.0,img:'https://images.unsplash.com/photo-1521120098172-6b5b86b32a51?auto=format&fit=crop&w=800&q=60'},
  {id:19,category:'clothes',name:'Performance Jersey',desc:'Breathable athletic fabric',price:6.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'},
  {id:20,category:'accessories',name:'Shoe Laces',desc:'Durable shoelaces in multiple colors',price:2.5,img:'https://images.unsplash.com/photo-1526178619227-0533f3b2b6c7?auto=format&fit=crop&w=800&q=60'},
  {id:21,category:'clothes',name:'Faux Fur',desc:'Soft faux fur for trims',price:14.0,img:'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60'},
  {id:22,category:'caps',name:'Bucket Hat',desc:'Casual bucket hat',price:10.0,img:'https://images.unsplash.com/photo-1508898578281-774ac4893a37?auto=format&fit=crop&w=800&q=60'},
  {id:23,category:'shoes',name:'Heel Caps',desc:'Protective heel caps',price:1.99,img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=60'},
  {id:24,category:'accessories',name:'Eyewear Case',desc:'Protective case for glasses',price:4.99,img:'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=60'}
];

const $ = (s) => document.querySelector(s);

function getCart(){ return JSON.parse(localStorage.getItem('fd_cart')||'[]'); }
function saveCart(c){ localStorage.setItem('fd_cart', JSON.stringify(c)); }

// Currency helper: convert USD amounts to NGN for display
window.EXCHANGE_RATE_USD_TO_NGN = window.EXCHANGE_RATE_USD_TO_NGN || 1100;
function formatPrice(amountUSD){
  const rate = Number(window.EXCHANGE_RATE_USD_TO_NGN) || 1;
  const ngn = (Number(amountUSD) || 0) * rate;
  try{ return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(ngn); }
  catch(e){ return '₦' + ngn.toFixed(2); }
}

function renderCart(){
  const list = getCart();
  const el = $('#cart-list'); el.innerHTML='';
  if(list.length===0){ el.innerHTML = '<div class="muted">Your cart is empty. Go back to <a href="index.html">shopping</a>.</div>'; $('#summary-total').textContent = '$0.00'; $('#summary-lines').innerHTML=''; renderRecommended(); return; }
  list.forEach(item=>{
    const row = document.createElement('div'); row.className = 'cart-row-large';
    row.innerHTML = `
      <div class="ci-thumb" style="background-image:url('${item.img}')"></div>
      <div class="ci-info">
        <div style="font-weight:600">${item.name}</div>
        <div class="muted">${item.desc || ''}</div>
          <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
          <div class="qty">
            <button class="qty-minus" data-id="${item.id}">-</button>
            <div class="muted">Qty: <span class="qty-num">${item.qty}</span></div>
            <button class="qty-plus" data-id="${item.id}">+</button>
          </div>
          <div style="font-weight:700">${formatPrice(item.price*item.qty)}</div>
        </div>
      </div>
      <div><button class="ghost remove" data-id="${item.id}">Remove</button></div>
    `;
    el.appendChild(row);
  });
  updateSummary(); renderRecommended();
}

function updateSummary(){
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>s + i.price * i.qty,0);
  // Always apply a shipping fee (no free-shipping threshold)
  const shipping = 4.99;
  const total = subtotal + shipping;
  $('#summary-lines').innerHTML = `<div class="summary-line"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="summary-line"><span>Shipping</span><span>${formatPrice(shipping)}</span></div>`;
  $('#summary-total').textContent = `${formatPrice(total)}`;
}

function renderRecommended(){
  const rec = $('#recommended'); rec.innerHTML='';
  // show up to 6 random products
  const sample = productsCatalog.slice().sort(()=>0.5-Math.random()).slice(0,6);
  sample.forEach(p=>{
    const c = document.createElement('div'); c.className='card';
    c.innerHTML = `
      <div class="thumb" style="height:80px;background-image:url('${p.img}')"></div>
      <div style="font-size:13px;font-weight:600;margin-top:6px">${p.name}</div>
      <div class="muted">${formatPrice(p.price)}</div>
      <div style="margin-top:8px"><button class="primary rec-add" data-id="${p.id}">Add</button></div>
    `;
    rec.appendChild(c);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();

  document.body.addEventListener('click',(e)=>{
    if(e.target.matches('.qty-plus')){
      const id = Number(e.target.dataset.id); const cart = getCart(); const it = cart.find(x=>x.id===id); if(it){ it.qty +=1; saveCart(cart); renderCart(); }
    }
    if(e.target.matches('.qty-minus')){
      const id = Number(e.target.dataset.id); let cart = getCart(); const it = cart.find(x=>x.id===id); if(it){ it.qty = Math.max(1,it.qty-1); saveCart(cart); renderCart(); }
    }
    if(e.target.matches('.remove')){
      const id = Number(e.target.dataset.id); let cart = getCart(); cart = cart.filter(x=>x.id!==id); saveCart(cart); renderCart();
    }
    if(e.target.matches('.rec-add')){
      const id = Number(e.target.dataset.id); const p = productsCatalog.find(x=>x.id===id); if(p){ let cart = getCart(); const found = cart.find(x=>x.id===id); if(found) found.qty +=1; else cart.push({id:p.id,name:p.name,desc:p.desc,price:p.price,img:p.img,qty:1}); saveCart(cart); renderCart(); }
    }
    if(e.target.id === 'cart-checkout'){
      // Open the dedicated payment page where the user can see merchant details and confirm payment
      window.location.href = 'payment.html';
    }
  });
});
