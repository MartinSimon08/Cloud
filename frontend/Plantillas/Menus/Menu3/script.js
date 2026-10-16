// Datos del menú. Reemplazá nombre, ingredientes y precio por los reales del restaurante.
const MENU = [
  { id: 1, category: "entradas", name: "Hummus de Garbanzos", price: 6.00, ingredients: ["Garbanzos", "Tahini", "Limón", "Comino", "Pan pita"] },
  { id: 2, category: "entradas", name: "Tabla de Vegetales Asados", price: 7.50, ingredients: ["Zapallo", "Berenjena", "Morrón", "Hierbas", "Aceite de oliva"] },

  { id: 3, category: "principales", name: "Bowl de Quinoa", price: 11.00, ingredients: ["Quinoa", "Palta", "Tomate cherry", "Rúcula", "Semillas"] },
  { id: 4, category: "principales", name: "Curry de Garbanzos", price: 10.50, ingredients: ["Garbanzos", "Leche de coco", "Curry", "Arroz basmati"] },
  { id: 5, category: "principales", name: "Wrap de Vegetales Grillados", price: 9.00, ingredients: ["Tortilla integral", "Vegetales grillados", "Hummus", "Hojas verdes"] },

  { id: 6, category: "postres", name: "Brownie de Algarroba", price: 5.00, ingredients: ["Algarroba", "Nueces", "Sin azúcar refinada"] },
  { id: 7, category: "postres", name: "Chia Pudding", price: 4.50, ingredients: ["Semillas de chía", "Leche de almendras", "Frutos rojos"] },

  { id: 8, category: "bebidas", name: "Limonada de Jengibre", price: 4.00, ingredients: ["Limón", "Jengibre", "Menta"] },
  { id: 9, category: "bebidas", name: "Té Helado de Frutos Rojos", price: 4.00, ingredients: ["Té negro", "Frutos rojos", "Menta"] },
];

const CATEGORY_LABELS = {
  entradas: "Entradas",
  principales: "Principales",
  postres: "Postres",
  bebidas: "Bebidas",
};

let activeCategory = "todos";

const tabs = document.getElementById("tabs");
const menuGrid = document.getElementById("menuGrid");
const emptyMsg = document.getElementById("emptyMsg");

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function renderMenu() {
  const filtered = MENU.filter(
    (item) => activeCategory === "todos" || item.category === activeCategory
  );

  menuGrid.innerHTML = "";
  emptyMsg.hidden = filtered.length !== 0;

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "dish-card";
    card.innerHTML = `
      <span class="dish-category">${CATEGORY_LABELS[item.category]}</span>
      <div class="dish-top">
        <span class="dish-name">${item.name}</span>
        <span class="dish-price">${formatPrice(item.price)}</span>
      </div>
      <div class="dish-ingredients">
        ${item.ingredients.map((ing) => `<span class="ingredient-tag">${ing}</span>`).join("")}
      </div>
    `;
    menuGrid.appendChild(card);
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
