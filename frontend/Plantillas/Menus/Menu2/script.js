// Datos del menú. Reemplazá nombre, ingredientes y precio por los reales del restaurante.
const MENU = [
  { id: 1, category: "entradas", name: "Empanadas de Carne", price: 3.50, ingredients: ["Carne cortada a cuchillo", "Cebolla", "Huevo", "Aceitunas"] },
  { id: 2, category: "entradas", name: "Provoleta a la Parrilla", price: 7.00, ingredients: ["Queso provolone", "Orégano", "Aceite de oliva", "Ají molido"] },
  { id: 3, category: "entradas", name: "Tabla de Fiambres", price: 9.50, ingredients: ["Jamón crudo", "Salame", "Queso", "Aceitunas", "Pan casero"] },

  { id: 4, category: "principales", name: "Milanesa Napolitana", price: 12.00, ingredients: ["Carne de ternera", "Salsa de tomate", "Mozzarella", "Jamón", "Papas fritas"] },
  { id: 5, category: "principales", name: "Pollo al Verdeo", price: 11.00, ingredients: ["Pechuga de pollo", "Crema", "Cebolla de verdeo", "Puré de papas"] },
  { id: 6, category: "principales", name: "Ravioles de Ricota", price: 10.50, ingredients: ["Pasta fresca", "Ricota", "Espinaca", "Salsa a elección"] },

  { id: 7, category: "postres", name: "Flan Casero", price: 5.00, ingredients: ["Huevo", "Leche", "Dulce de leche", "Crema"] },
  { id: 8, category: "postres", name: "Panqueques con Dulce de Leche", price: 5.50, ingredients: ["Panqueques", "Dulce de leche", "Crema"] },

  { id: 9, category: "bebidas", name: "Agua Mineral", price: 2.00, ingredients: ["Agua con o sin gas"] },
  { id: 10, category: "bebidas", name: "Vino de la Casa (copa)", price: 4.50, ingredients: ["Malbec de bodega local"] },
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

function formatPrice(n) {
  return "$" + n.toFixed(2);
}

function renderMenu() {
  const filtered = MENU.filter(
    (item) => activeCategory === "todos" || item.category === activeCategory
  );

  menuList.innerHTML = "";

  if (filtered.length === 0) {
    menuList.innerHTML = `<p class="empty-msg">No hay platos en esta categoría.</p>`;
    return;
  }

  const categoriesToShow =
    activeCategory === "todos" ? Object.keys(CATEGORY_LABELS) : [activeCategory];

  categoriesToShow.forEach((category) => {
    const items = filtered.filter((item) => item.category === category);
    if (items.length === 0) return;

    const heading = document.createElement("h2");
    heading.className = "category-heading";
    heading.textContent = CATEGORY_LABELS[category];
    menuList.appendChild(heading);

    items.forEach((item) => {
      const dish = document.createElement("article");
      dish.className = "dish";
      dish.innerHTML = `
        <div class="dish-top">
          <span class="dish-name">${item.name}</span>
          <span class="dish-price">${formatPrice(item.price)}</span>
        </div>
        <div class="dish-ingredients">
          ${item.ingredients.map((ing) => `<span class="ingredient-tag">${ing}</span>`).join("")}
        </div>
      `;
      menuList.appendChild(dish);
    });
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
