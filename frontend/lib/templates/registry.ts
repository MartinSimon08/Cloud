import type { PageTemplate, MenuTemplate } from "@/lib/models";

/**
 * Every ported template gets an entry here. Only one of each exists today —
 * this registry (plus the pageTemplate/menuTemplate fields already on
 * RestaurantDoc) is the hook for adding more later without touching how a
 * restaurant picks or stores its choice, just the switch in app/[slug]/page.tsx
 * and app/[slug]/menu/page.tsx that renders the right component.
 *
 * `previewPath` points at the original, unmodified template — a straight
 * copy of its source files under public/plantillas-preview/ — so the design
 * picker can link out to what the stock design actually looks like before
 * anyone commits to it.
 */

export const PAGE_TEMPLATES: { value: PageTemplate; label: string; description: string; previewPath: string }[] = [
  {
    value: "pagina6",
    label: "Clásico",
    description: "Héroe con portada, historia, platos destacados, testimonios y contacto.",
    previewPath: "/plantillas-preview/paginas/pagina6/index.html",
  },
  {
    value: "pagina1",
    label: "Fast Food",
    description: "Oscuro y directo, con servicios, destacados y una gran llamada a la acción.",
    previewPath: "/plantillas-preview/paginas/pagina1/index.html",
  },
  {
    value: "pagina3",
    label: "Elegante",
    description: "Claro y cálido, con historia, platos destacados, galería y contacto.",
    previewPath: "/plantillas-preview/paginas/pagina3/index.html",
  },
  {
    value: "pagina4",
    label: "Alta Cocina",
    description: "Oscuro y dorado, para un restaurante formal con platos y reservas en mente.",
    previewPath: "/plantillas-preview/paginas/pagina4/index.html",
  },
  {
    value: "pagina5",
    label: "Café",
    description: "Verde y luminoso, pensado para cafeterías, con horarios destacados.",
    previewPath: "/plantillas-preview/paginas/pagina5/index.html",
  },
];

export const MENU_TEMPLATES: { value: MenuTemplate; label: string; description: string; previewPath: string }[] = [
  {
    value: "menu2",
    label: "Simple",
    description: "Lista de platos agrupados por categoría, con pestañas de filtro.",
    previewPath: "/plantillas-preview/menus/menu2/index.html",
  },
  {
    value: "menu1",
    label: "Grilla",
    description: "Grilla de platos con foto, buscador y pestañas de categoría.",
    previewPath: "/plantillas-preview/menus/menu1/index.html",
  },
  {
    value: "menu3",
    label: "Natural",
    description: "Tarjetas claras con ingredientes, ideal para propuestas saludables.",
    previewPath: "/plantillas-preview/menus/menu3/index.html",
  },
  {
    value: "menu4",
    label: "Parrilla",
    description: "Lista oscura con foto por plato, ideal para parrillas y carnes.",
    previewPath: "/plantillas-preview/menus/menu4/index.html",
  },
  {
    value: "menu5",
    label: "Bar",
    description: "Estilo bien urbano y directo, ideal para hamburgueserías y bares.",
    previewPath: "/plantillas-preview/menus/menu5/index.html",
  },
];
