const MENU = [
  {
    id: 1,
    name: "Bruschetta Clásica",
    category: "entradas",
    price: 6.50,
    desc: "Pan tostado con tomate fresco, ajo, albahaca y un hilo de aceite de oliva.",
    img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=70",
    emoji: "🍞"
  },
  {
    id: 2,
    name: "Sopa de Cebolla Gratinada",
    category: "entradas",
    price: 7.00,
    desc: "Cebollas caramelizadas en caldo de carne, cubierta de queso gratinado.",
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=70",
    emoji: "🥣"
  },
  {
    id: 3,
    name: "Ensalada César",
    category: "entradas",
    price: 8.50,
    desc: "Lechuga romana, crutones caseros, parmesano y aderezo césar tradicional.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=70",
    emoji: "🥗"
  },
  {
    id: 4,
    name: "Tequeños de Queso",
    category: "entradas",
    price: 6.00,
    desc: "Bastones crocantes rellenos de queso, servidos con salsa de guayaba.",
    img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=70",
    emoji: "🧀"
  },
  {
    id: 5,
    name: "Pizza Margarita",
    category: "principales",
    price: 12.00,
    desc: "Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva extra virgen.",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=70",
    emoji: "🍕"
  },
  {
    id: 6,
    name: "Hamburguesa Doble",
    category: "principales",
    price: 11.50,
    desc: "Doble medallón de carne, cheddar, panceta, lechuga y salsa especial de la casa.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=70",
    emoji: "🍔"
  },
  {
    id: 7,
    name: "Pasta Alfredo",
    category: "principales",
    price: 13.00,
    desc: "Fettuccine en cremosa salsa de manteca, parmesano y pimienta negra.",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=70",
    emoji: "🍝"
  },
  {
    id: 8,
    name: "Sushi Variado",
    category: "principales",
    price: 16.00,
    desc: "Selección de 12 piezas: rolls california, niguiris de salmón y atún.",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=500&q=70",
    emoji: "🍣"
  },
  {
    id: 9,
    name: "Bife de Chorizo",
    category: "principales",
    price: 18.00,
    desc: "Corte premium a la parrilla, acompañado de papas rústicas y chimichurri.",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=500&q=70",
    emoji: "🥩"
  },
  {
    id: 10,
    name: "Tacos al Pastor",
    category: "principales",
    price: 10.00,
    desc: "Tres tacos de cerdo marinado, piña asada, cilantro y cebolla morada.",
    img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=70",
    emoji: "🌮"
  },
  {
    id: 11,
    name: "Tiramisú",
    category: "postres",
    price: 6.50,
    desc: "Clásico postre italiano con capas de café, mascarpone y cacao.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=70",
    emoji: "🍰"
  },
  {
    id: 12,
    name: "Cheesecake de Frutos Rojos",
    category: "postres",
    price: 7.00,
    desc: "Base de galleta, queso crema horneado y coulis de frutos rojos.",
    img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=500&q=70",
    emoji: "🍓"
  },
  {
    id: 13,
    name: "Helado Artesanal",
    category: "postres",
    price: 5.50,
    desc: "Tres bochas a elección: vainilla, chocolate o dulce de leche.",
    img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=70",
    emoji: "🍨"
  },
  {
    id: 14,
    name: "Café Espresso",
    category: "bebidas",
    price: 3.00,
    desc: "Café espresso intenso, tostado artesanal de origen único.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=70",
    emoji: "☕"
  },
  {
    id: 15,
    name: "Limonada Natural",
    category: "bebidas",
    price: 4.00,
    desc: "Limón exprimido, menta fresca y un toque de jengibre.",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=70",
    emoji: "🍋"
  },
  {
    id: 16,
    name: "Copa de Vino Tinto",
    category: "bebidas",
    price: 7.50,
    desc: "Selección de la casa, cosecha propia de la bodega regional.",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=70",
    emoji: "🍷"
  },
  {
    id: 17,
    name: "Cerveza Artesanal",
    category: "bebidas",
    price: 6.00,
    desc: "IPA local servida bien fría, notas cítricas y amargor equilibrado.",
    img: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=500&q=70",
    emoji: "🍺"
  }
];

let activeCategory = "todos";
let searchTerm = "";
let cart = {};

const menuGrid = document.getElementById("menuGrid");
const emptyMsg = document.getElementById("emptyMsg");
const tabs = document.getElementById("tabs");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cartCount");
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCart");

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function renderMenu() {
  const filtered = MENU.filter(item => {
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                           item.desc.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = "";
  emptyMsg.hidden = filtered.length !== 0;

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img class="card-img" src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <h3>${item.name}</h3>
          <span class="price">${formatPrice(item.price)}</span>
        </div>
        <p class="desc">${item.desc}</p>
        <button class="add-btn" data-id="${item.id}">Agregar al pedido</button>
      </div>
    `;

    const img = card.querySelector(".card-img");
    img.addEventListener("error", () => {
      img.replaceWith(Object.assign(document.createElement("div"), {
        className: "card-img fallback",
        textContent: item.emoji
      }));
    }, { once: true });

    menuGrid.appendChild(card);
  });
}

function renderCart() {
  const entries = Object.values(cart);
  const totalCount = entries.reduce((sum, e) => sum + e.qty, 0);
  const totalPrice = entries.reduce((sum, e) => sum + e.qty * e.item.price, 0);

  cartCount.textContent = totalCount;
  cartTotalEl.textContent = formatPrice(totalPrice);

  if (entries.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Tu pedido está vacío. ¡Elegí algo rico! 🍽️</p>`;
    return;
  }

  cartItemsEl.innerHTML = "";
  entries.forEach(({ item, qty }) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
      </div>
      <div class="qty-controls">
        <button data-action="dec" data-id="${item.id}">−</button>
        <span>${qty}</span>
        <button data-action="inc" data-id="${item.id}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });
}

function addToCart(id) {
  const item = MENU.find(m => m.id === id);
  if (!item) return;
  if (!cart[id]) cart[id] = { item, qty: 0 };
  cart[id].qty += 1;
  renderCart();
  openCart();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  renderCart();
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}

function hideCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

tabs.addEventListener("click", e => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  renderMenu();
});

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderMenu();
});

menuGrid.addEventListener("click", e => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  addToCart(Number(btn.dataset.id));
});

cartItemsEl.addEventListener("click", e => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const delta = btn.dataset.action === "inc" ? 1 : -1;
  changeQty(id, delta);
});

clearCartBtn.addEventListener("click", () => {
  cart = {};
  renderCart();
});

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
overlay.addEventListener("click", hideCart);

renderMenu();
renderCart();
