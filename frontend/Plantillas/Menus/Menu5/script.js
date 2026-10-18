// Datos del menú. Reemplazá nombre, descripción y precio por los reales del bar.
const MENU = [
  { id: 1, category: "hamburguesas", name: "La Bardera", price: 7200, desc: "Doble cheddar, panceta crocante, cebolla crispy y salsa bardera.", ingredients: ["Doble carne", "Doble cheddar", "Panceta", "Pan de papa"] },
  { id: 2, category: "hamburguesas", name: "Triple Amenaza", price: 9500, desc: "Para los que no vinieron a jugar. Tres capas, cero piedad.", ingredients: ["Triple carne", "Triple cheddar", "Bacon", "Salsa ahumada"] },
  { id: 3, category: "hamburguesas", name: "Sin Vueltas", price: 5200, desc: "La clásica de toda la vida, bien hecha y sin relleno de más.", ingredients: ["Carne simple", "Lechuga", "Tomate", "Mayo casera"] },
  { id: 4, category: "hamburguesas", name: "La Garca", price: 7800, desc: "Blue cheese, cebolla morada y un toque de miel picante que te va a gustar más de lo que admitís.", ingredients: ["Blue cheese", "Cebolla morada", "Rúcula", "Miel picante"] },

  { id: 5, category: "picadas", name: "Picada de Bardo", price: 8500, desc: "Para compartir, en teoría. Fiambres, quesos, papas y aceitunas.", ingredients: ["Fiambres", "Quesos", "Papas", "Aceitunas"] },
  { id: 6, category: "picadas", name: "Papas Bravas", price: 4200, desc: "Papas fritas bien crocantes con salsa picante, cheddar y panceta arriba.", ingredients: ["Papas fritas", "Salsa picante", "Cheddar", "Panceta"] },
  { id: 7, category: "picadas", name: "Rabas del Barrio", price: 6800, desc: "Rabas fritas con limón y salsa golf, como las de siempre.", ingredients: ["Rabas", "Limón", "Salsa golf"] },

  { id: 8, category: "birras", name: "Rubia Tirada", price: 3200, desc: "Pinta de 500ml, bien helada, sin vueltas.", ingredients: ["Pinta 500ml"] },
  { id: 9, category: "birras", name: "Negra Tirada", price: 3400, desc: "Más cuerpo, más carácter. Para los que saben.", ingredients: ["Pinta 500ml"] },
  { id: 10, category: "birras", name: "IPA Artesanal", price: 3800, desc: "Amarga, con onda y con actitud.", ingredients: ["Botella 473ml"] },
  { id: 11, category: "birras", name: "Porrón Bien Helado", price: 2900, desc: "El de siempre, el que nunca falla.", ingredients: ["Porrón 473ml"] },

  { id: 12, category: "tragos", name: "Fernet con Coca", price: 4500, desc: "El clásico de toda la vida. No se explica, se toma.", ingredients: ["Fernet", "Coca-Cola", "Hielo"] },
  { id: 13, category: "tragos", name: "Gin Tonic Bardero", price: 5200, desc: "Gin, tónica, pomelo y un toque de enebro para hacerla difícil.", ingredients: ["Gin", "Tónica", "Pomelo", "Enebro"] },
  { id: 14, category: "tragos", name: "Jagger Bomb", price: 4800, desc: "Para cuando la noche recién empieza.", ingredients: ["Jagermeister", "Energizante"] },
];

const CATEGORY_LABELS = {
  hamburguesas: "Hamburguesas",
  picadas: "Picadas",
  birras: "Birras",
  tragos: "Tragos",
};

let activeCategory = "todos";

const tabs = document.getElementById("tabs");
const menuGrid = document.getElementById("menuGrid");
const emptyMsg = document.getElementById("emptyMsg");

function formatPrice(n) {
  return "$" + n.toLocaleString("es-AR");
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
      <p class="dish-desc">${item.desc}</p>
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
