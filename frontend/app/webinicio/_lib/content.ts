import type { LandingContent } from "./types";

export const content: LandingContent = {
  brand: "TuMenuAhora",
  nav: {
    links: [
      { label: "Inicio", href: "#top" },
      { label: "Producto", href: "#features" },
      { label: "Cómo funciona", href: "#how" },
      { label: "Por qué elegirnos", href: "#why" },
      { label: "Preguntas", href: "#faq" },
    ],
    cta: "Pedí tu demo",
  },
  hero: {
    eyebrow: "Menú digital para bares y restaurantes · Argentina",
    headline: ["Dejá el menú", "de papel,", "sumá pedidos,", "ahorrá tiempo."],
    sub: "Creá tu carta digital, recibí pedidos con tu propio dominio y manejá todo tu local desde un solo panel. Sin comisión por venta y sin instalar nada.",
    ctaPrimary: "Pedí una demo",
    ctaSecondary: "Mirá cómo funciona",
    stats: [
      { value: "99.9%", label: "de disponibilidad" },
      { value: "0%", label: "de comisión por pedido" },
      { value: "<10 min", label: "de respuesta por WhatsApp" },
    ],
    ticket: {
      title: "Pedido nuevo · #5214",
      time: "21:08",
      rows: [
        { qty: "1 ×", name: "Burger doble cheddar", price: "$8.200" },
        { qty: "2 ×", name: "Papas con cheddar y panceta", price: "$5.600" },
        { qty: "1 ×", name: "Birra IPA 473ml", price: "$3.100" },
      ],
      footLabel: "Take away · Barrio Norte",
      total: "$16.900",
    },
    pipeline: {
      title: "Cocina · pedidos activos",
      jobs: [
        { code: "#5214", time: "3:02" },
        { code: "#5215", time: "1:40" },
        { code: "#5211", time: "Listo", done: true },
        { code: "#5216", time: "0:25" },
      ],
    },
  },
  problem: {
    kicker: "El problema",
    heading: "Un menú en papel te frena, no te vende.",
    cards: [
      { stat: "–22%", title: "Ventas que se escapan", desc: "Clientes que dudan, no preguntan el precio y terminan yéndose sin pedir nada." },
      { stat: "25%", title: "Comisión por pedido", desc: "Las apps de delivery se quedan con una parte grande de cada venta y de paso te sacan el contacto con el cliente." },
      { stat: "+4 hs", title: "Tiempo perdido en cambios", desc: "Actualizar un precio o sacar un plato significa rehacer e imprimir todo de nuevo." },
    ],
  },
  solution: {
    kicker: "Nuestra propuesta",
    heading: "Un menú digital que labura por tu local.",
    sub: "TuMenuAhora junta en un solo lugar el QR de mesa, el delivery propio, el take away y el mostrador — con tu marca, tu dominio y tus reglas de siempre.",
  },
  features: {
    kicker: "Qué incluye",
    heading: "Lo justo y necesario para vender más rápido.",
    rows: [
      {
        tag: "Pedidos",
        title: "Salón, take away, mostrador y delivery en un solo lugar.",
        desc: "Centralizá todos los canales de venta. Calculá el costo de envío según la zona, generá el ticket y mandá la comanda directo a cocina.",
        bullets: ["Zonas de envío configurables", "Ticket y comanda automáticos", "Pantalla para cocina"],
        kind: "ticket",
      },
      {
        tag: "Gestión",
        title: "Todas tus sucursales, un solo panel.",
        desc: "Administrá cada local por separado o todos juntos. Pantalla para cocina, pantalla para el mostrador y un registro de clientes con mapa de pedidos.",
        bullets: ["Multisucursal", "Historial de clientes", "Mapa de pedidos"],
        kind: "pipeline",
      },
      {
        tag: "Tu marca",
        title: "Tu dominio, tu identidad, tu plata.",
        desc: "Publicá en tudominio.com.ar o en tunegocio.tumenuahora.com. Elegís el logo, los colores y la tipografía, y cobrás con tus propios medios de pago, sin comisión por venta.",
        bullets: ["Dominio propio", "Medios de pago integrados", "Sin comisión por venta"],
        kind: "domain",
      },
      {
        tag: "Acompañamiento",
        title: "Te atiende una persona, no un bot.",
        desc: "Tenés un encargado de cuenta asignado a tu negocio y soporte por WhatsApp en horario comercial, con respuesta rápida.",
        bullets: ["Encargado de cuenta", "Soporte por WhatsApp", "Guía de arranque incluida"],
        kind: "chat",
      },
    ],
  },
  how: {
    kicker: "Cómo empezás",
    heading: "En pocos días ya estás recibiendo pedidos.",
    steps: [
      { n: "01", title: "Charla inicial de 20 minutos", desc: "Coordinamos una videollamada corta para entender tu local y mostrarte la plataforma con un menú armado como el tuyo." },
      { n: "02", title: "Activamos tu cuenta", desc: "En 48 horas hábiles tenés acceso al panel y empezamos a configurar tu dominio y tus medios de cobro." },
      { n: "03", title: "Cargás tu carta y arrancás", desc: "Subís tus productos, precios y fotos cuando quieras. Te acompañamos por WhatsApp en cada paso." },
    ],
  },
  testimonials: {
    kicker: "Clientes reales",
    heading: "Lo que cuentan los que ya dejaron el papel.",
    items: [
      { quote: "Antes perdíamos pedidos porque el teléfono daba ocupado los findes. Ahora entra todo por la web y armamos nuestro propio delivery, sin pagarle un cuarto del ticket a nadie.", initials: "LB", name: "Lucas Bermúdez", role: "Dueño, Bar El Zaguán · La Plata" },
      { quote: "Lo que más valoro es que cualquiera del turno puede actualizar el menú en el momento. Antes nos quedábamos semanas esperando para reimprimir las cartas.", initials: "CN", name: "Carla Núñez", role: "Encargada, Pizzería Doña Rosa · Quilmes" },
      { quote: "No tengo local fijo, así que necesitaba algo simple de verdad. En una tarde tenía el menú armado y esa misma noche llegó el primer pedido.", initials: "FA", name: "Franco Aquino", role: "Food truck La Ruta · Mar del Plata" },
    ],
  },
  contact: {
    kicker: "Hablemos",
    heading: "Contanos cómo es tu local.",
    sub: "Coordinamos una charla corta, en el horario que te quede cómodo. Sin compromiso ni vueltas.",
    bullets: ["Demo armada con tu propio menú", "Te respondemos en menos de un día hábil", "Propuesta a medida de tu negocio"],
    privacy: "Tu información queda con nosotros. No se la pasamos a nadie.",
    submitLabel: "Quiero mi demo",
    sentMessage: "¡Recibido! Te escribimos en las próximas horas.",
  },
  faq: {
    kicker: "Dudas frecuentes",
    heading: "Antes de que preguntes, te contamos.",
    items: [
      { q: "¿Cuánto sale?", a: "Es un costo fijo mensual, sin comisión por pedido. Varía según la cantidad de sucursales y canales que uses. En la demo te armamos un presupuesto concreto." },
      { q: "¿Puedo usar mi propio dominio?", a: "Sí. Podés usar tudominio.com.ar o un subdominio de tumenuahora.com. La configuración la hacemos nosotros, vos no tenés que tocar nada técnico." },
      { q: "¿Tengo que instalar algo?", a: "No, es todo desde el navegador. Tus clientes ven el menú desde el celular y vos administrás desde cualquier dispositivo." },
      { q: "¿Se puede cobrar online?", a: "Sí, tenemos integración con medios de pago digitales, además de efectivo y débito en el local." },
      { q: "¿Cómo es el proceso de alta?", a: "Arrancamos con una charla de 20 minutos. Si seguimos adelante, en 48 horas hábiles ya tenés acceso a la plataforma." },
      { q: "¿Qué pasa si tengo un problema?", a: "Le escribís por WhatsApp a tu encargado de cuenta en horario comercial y te responde en minutos, no en días." },
    ],
  },
  footer: {
    tagline: "El menú digital de los locales que quieren manejar sus propios pedidos.",
    cta: "Empezar ahora",
    cols: [
      { title: "Producto", links: ["Pedidos", "Gestión", "Tu marca", "Soporte"] },
      { title: "Empresa", links: ["Nosotros", "Clientes", "Novedades", "Términos"] },
      { title: "Contacto", links: ["hola@tumenuahora.com", "WhatsApp", "Instagram"] },
    ],
    bottom: ["© 2026 TuMenuAhora. Todos los derechos reservados.", "Hecho en Argentina "],
  },
};
