// Datos del menú. "photo" es un ícono + degradé de ejemplo: reemplazá el bloque
// .dish-photo por <img src="tu-foto.jpg" alt="..."> cuando tengas las fotos reales.
const MENU = [
  { id: 1, category: "entradas", name: "Chorizo Criollo", price: 5.50, ingredients: ["Chorizo de cerdo", "Pan casero", "Chimichurri"], photo: { emoji: "🌭", colorA: "#e0652f", colorB: "#9c3414" } },
  { id: 2, category: "entradas", name: "Provoleta", price: 7.00, ingredients: ["Queso provolone", "Orégano", "Ají molido"], photo: { emoji: "🧀", colorA: "#e8a23b", colorB: "#a85e12" } },

  { id: 3, category: "principales", name: "Bife de Chorizo", price: 18.00, ingredients: ["Corte premium", "Papas rústicas", "Chimichurri"], photo: { emoji: "🥩", colorA: "#c0432a", colorB: "#7a2314" } },
  { id: 4, category: "principales", name: "Asado de Tira", price: 16.50, ingredients: ["Costilla vacuna", "Sal parrillera", "Ensalada mixta"], photo: { emoji: "🍖", colorA: "#b8502f", colorB: "#6f2a16" } },
  { id: 5, category: "principales", name: "Pollo al Disco", price: 12.50, ingredients: ["Pollo", "Morrones", "Cebolla", "Vino blanco"], photo: { emoji: "🍗", colorA: "#e0a23c", colorB: "#9c6412" } },

  { id: 6, category: "postres", name: "Flan con Dulce de Leche", price: 5.00, ingredients: ["Huevo", "Leche", "Dulce de leche"], photo: { emoji: "🍮", colorA: "#d99a3f", colorB: "#8c5c17" } },
  { id: 7, category: "postres", name: "Helado Artesanal", price: 5.50, ingredients: ["Vainilla", "Chocolate", "Dulce de leche"], photo: { emoji: "🍨", colorA: "#cf8c56", colorB: "#8a5225" } },

  { id: 8, category: "bebidas", name: "Malbec Reserva (copa)", price: 7.50, ingredients: ["Bodega regional"], photo: { emoji: "🍷", colorA: "#7a2338", colorB: "#43101d" } },
  { id: 9, category: "bebidas", name: "Cerveza Tirada", price: 5.00, ingredients: ["IPA local"], photo: { emoji: "🍺", colorA: "#d9a233", colorB: "#8c6512" } },
];

const CATEGORY_LABELS = {
  entradas: "Entradas",
  principales: "Principales",
  postres: "Postres",
  bebidas: "Bebidas",
};

let activeCategory = "todos";

const tabs = document.getElementById("tabs");
const menuList = document.getElementById("menuList");
const emptyMsg = document.getElementById("emptyMsg");

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function renderMenu() {
  const filtered = MENU.filter(
    (item) => activeCategory === "todos" || item.category === activeCategory
  );

  menuList.innerHTML = "";
  emptyMsg.hidden = filtered.length !== 0;

  filtered.forEach((item) => {
    const dish = document.createElement("article");
    dish.className = "dish";
    dish.innerHTML = `
      <div class="dish-photo" style="--dish-color-a:${item.photo.colorA}; --dish-color-b:${item.photo.colorB}">
        ${item.photo.emoji}
      </div>
      <div class="dish-body">
        <div class="dish-top">
          <span class="dish-name">${item.name}</span>
          <span class="dish-price">${formatPrice(item.price)}</span>
        </div>
        <div class="dish-ingredients">
          ${item.ingredients.map((ing) => `<span class="ingredient-tag">${ing}</span>`).join("")}
        </div>
      </div>
    `;
    menuList.appendChild(dish);
  });
}

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  renderMenu();
});

renderMenu();
