import type { LandingContent } from "./types";

// Clon del copy real de wemenu.app, para comparación local.
// No usar tal cual en un despliegue público: es contenido y marca de otra empresa.
export const content: LandingContent = {
  brand: "WeMenú",
  nav: {
    links: [
      { label: "Producto", href: "#features" },
      { label: "Cómo funciona", href: "#how" },
      { label: "Por qué WeMenú", href: "#why" },
      { label: "Preguntas", href: "#faq" },
    ],
    cta: "Empezar ahora",
  },
  hero: {
    eyebrow: "Plataforma de menú digital · Argentina",
    headline: ["Tu restaurante,", "sin papel,", "sin comisiones,", "sin vueltas."],
    sub: "Armá tu menú digital, recibí pedidos por tu propio dominio y gestioná todo desde un lugar. Nada de comisiones por venta, nada de software para instalar.",
    ctaPrimary: "Quiero una demo",
    ctaSecondary: "Ver cómo funciona",
    stats: [
      { value: "99%", label: "de uptime" },
      { value: "0%", label: "de comisión por pedido" },
      { value: "<10 min", label: "respuesta por WhatsApp" },
    ],
    ticket: {
      title: "Nuevo pedido · #4827",
      time: "23:41",
      rows: [
        { qty: "2 ×", name: "Cheeseburger", price: "$7.500" },
        { qty: "1 ×", name: "Papas clásicas", price: "$2.400" },
        { qty: "1 ×", name: "Coca Zero", price: "$1.200" },
      ],
      footLabel: "Delivery · Palermo",
      total: "$11.100",
    },
    pipeline: {
      title: "Cocina · en preparación",
      jobs: [
        { code: "#4827", time: "2:14" },
        { code: "#4828", time: "0:48" },
        { code: "#4825", time: "Listo", done: true },
        { code: "#4829", time: "0:12" },
      ],
    },
  },
  problem: {
    kicker: "El problema",
    heading: "El menú de papel te está costando plata.",
    cards: [
      { stat: "–18%", title: "Pedidos perdidos", desc: "Clientes que no se animan a preguntar precios, o que se van antes de que llegue el mozo." },
      { stat: "25%", title: "Comisiones de apps", desc: "Cada pedido por delivery externo se lleva un cuarto de tu ticket. Y te quita el cliente." },
      { stat: "+3 hs", title: "Horas en cambios", desc: "Subir un precio, sacar un plato, cambiar una foto. Imprimir todo de nuevo." },
    ],
  },
  solution: {
    kicker: "La solución",
    heading: "Un menú que trabaja para vos.",
    sub: "WeMenú es la plataforma de pedidos que tu negocio debería tener. QR, delivery, take away y salón — con tu marca, tu dominio, tus reglas.",
  },
  features: {
    kicker: "Lo que hace",
    heading: "Todo lo que necesitás. Nada que no uses.",
    rows: [
      {
        tag: "Pedidos",
        title: "Delivery, take away, mostrador y salón.",
        desc: "Un solo sistema para todos los canales. Zonas de entrega con costo calculado por ubicación, emisión de ticket y comanda directa a cocina.",
        bullets: ["Zonas de envío automáticas", "Ticket + comanda", "Pantalla de cocina"],
        kind: "ticket",
      },
      {
        tag: "Gestión",
        title: "Una plataforma. Todas tus sucursales.",
        desc: "Manejá varios locales desde un panel. Pantalla de cocina, pantalla de cliente en mostrador, base de clientes con mapa de calor.",
        bullets: ["Multi sucursal", "Gestión de clientes", "Mapa de calor"],
        kind: "pipeline",
      },
      {
        tag: "Tu marca",
        title: "Tu dominio. Tu identidad. Tu plata.",
        desc: "tunegocio.com o tunegocio.wemenu.app. Logo, colores, tipografía — como vos querés. Pagos nativos. Costo fijo, sin comisiones por venta.",
        bullets: ["Dominio propio", "Pagos integrados", "Sin comisiones"],
        kind: "domain",
      },
      {
        tag: "Soporte",
        title: "Un humano. No un ticket.",
        desc: "Ejecutivo asignado exclusivamente a tu negocio. Soporte por WhatsApp en horario comercial, con respuesta promedio en menos de 10 minutos.",
        bullets: ["Ejecutivo dedicado", "WhatsApp directo", "Onboarding guiado"],
        kind: "chat",
      },
    ],
  },
  how: {
    kicker: "Cómo arrancás",
    heading: "En días estás vendiendo.",
    steps: [
      { n: "01", title: "Demo de 30 minutos", desc: "Agendá en el día y horario que mejor te quede. Te mostramos la plataforma con datos reales de tu rubro, sin libreto." },
      { n: "02", title: "Alta comercial", desc: "En 48 horas hábiles te damos de alta y tu negocio ya está disponible en la plataforma para empezar a configurarlo." },
      { n: "03", title: "Cargás y salís a vender", desc: "Vos tomás el control: cargás tus productos, precios y fotos. Te acompañamos paso a paso por WhatsApp." },
    ],
  },
  testimonials: {
    kicker: "Lo dicen ellos",
    heading: "Testimonios reales de quienes ya dejaron el papel.",
    items: [
      { quote: "En dos meses pasamos de perder pedidos por teléfono a tener un 30% más de ticket promedio. El soporte es real, atienden por WhatsApp como si fueran del equipo.", initials: "MI", name: "Martín Iriarte", role: "Dueño, Parrilla La Paz · 2 sucursales" },
      { quote: "Dejamos de pagar comisiones del 25% a apps de delivery. En el primer mes recuperamos la inversión del año.", initials: "SC", name: "Sofía Calderón", role: "Gerente, Café Brío" },
      { quote: "Lo que más me gustó: no tuve que aprender nada. Me lo configuraron, me enseñaron en una tarde, y listo.", initials: "DF", name: "Diego Ferreyra", role: "Food Truck · Mendoza" },
    ],
  },
  contact: {
    kicker: "Hablemos",
    heading: "Contanos de tu negocio.",
    sub: "Agendamos tu demo de 30 minutos en el día y horario que mejor te quede. Sin compromiso, sin vendedor insistente.",
    bullets: ["Demo personalizada con tu menú real", "Respuesta en menos de 24 hs hábiles", "Cotización a medida, sin compromiso"],
    privacy: "Tus datos son tuyos. No compartimos con terceros.",
    submitLabel: "Agendar demo",
    sentMessage: "¡Listo! Te contactamos en las próximas horas.",
  },
  faq: {
    kicker: "Preguntas",
    heading: "Lo que siempre nos preguntan.",
    items: [
      { q: "¿Cuánto cuesta?", a: "Costo fijo mensual, sin comisiones por pedido. El plan depende de cantidad de sucursales y canales activos. En la demo te armamos una propuesta a medida." },
      { q: "¿Puedo usar mi propio dominio?", a: "Sí. Podés usar tunegocio.com o tu subdominio en wemenu.app. Lo configuramos nosotros, vos no tocás DNS." },
      { q: "¿Necesito instalar algo?", a: "Nada. Es 100% en la nube. Tus clientes entran desde el navegador, vos gestionás desde cualquier dispositivo." },
      { q: "¿Funciona con pagos digitales?", a: "Sí, integración nativa. También pagos en efectivo, débito en el local, y podés sumar otros métodos." },
      { q: "¿Cómo es la implementación?", a: "Agendamos una demo de 30 minutos. Si avanzamos, en 48 horas hábiles te damos el alta comercial y accedés a la plataforma." },
      { q: "¿Cómo es el soporte?", a: "Tenés un ejecutivo asignado exclusivamente a tu negocio y atención por WhatsApp en horario comercial. Respondemos en menos de 10 minutos promedio." },
    ],
  },
  footer: {
    tagline: "El sistema de pedidos de los que no quieren depender de nadie.",
    cta: "Empezar ahora",
    cols: [
      { title: "Producto", links: ["Pedidos", "Gestión", "Tu marca", "Soporte"] },
      { title: "Empresa", links: ["Nosotros", "Clientes", "Blog", "Términos"] },
      { title: "Contacto", links: ["hola@wemenu.app", "WhatsApp", "Instagram"] },
    ],
    bottom: ["© 2026 WeMenú. Todos los derechos reservados.", "Hecho en Argentina ✦"],
  },
};
