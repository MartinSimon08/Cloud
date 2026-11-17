import type { ComponentType } from "react";
import {
  CrearCuenta,
  CrearRestaurante,
  DatosGenerales,
  ElegirPlantillaPagina,
  CompletarContenido,
  PublicarPagina,
  CrearMenu,
  CargarPlatos,
  ActivarMenu,
  CompartirTodo,
} from "./visuals";

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  Visual: ComponentType;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: "cuenta",
    title: "Creá tu cuenta",
    description: "Iniciá sesión con tu email. No hace falta instalar nada, todo se maneja desde el navegador.",
    Visual: CrearCuenta,
  },
  {
    id: "restaurante",
    title: "Creá tu restaurante",
    description: "Armá la ficha de tu local en segundos: nombre y listo, ya tenés tu propio panel.",
    Visual: CrearRestaurante,
  },
  {
    id: "datos",
    title: "Completá los datos generales",
    description: "Subí tu logo y una foto de portada, cargá tu dirección, contacto y el link de Google Maps.",
    Visual: DatosGenerales,
  },
  {
    id: "plantilla-pagina",
    title: "Elegí el diseño de tu página",
    description: "Mirá las plantillas disponibles y elegí la que más se parece a tu local. La podés cambiar cuando quieras.",
    Visual: ElegirPlantillaPagina,
  },
  {
    id: "contenido",
    title: "Completá el contenido que pide tu plantilla",
    description: "Cada plantilla te pide sus propias secciones: platos destacados, por qué elegirnos, testimonios. El sistema te avisa qué te falta.",
    Visual: CompletarContenido,
  },
  {
    id: "publicar-pagina",
    title: "Publicá tu página",
    description: "Cuando está todo completo, activás el switch y tu página queda online al instante, con su propio link.",
    Visual: PublicarPagina,
  },
  {
    id: "crear-menu",
    title: "Creá tu menú digital",
    description: "Armá uno o varios menús (carta principal, menú de verano, de mediodía) y ponele un nombre a cada uno.",
    Visual: CrearMenu,
  },
  {
    id: "cargar-platos",
    title: "Cargá tus platos y precios",
    description: "Sumá cada plato con su foto, descripción y precio. Reordenalos como quieras arrastrándolos.",
    Visual: CargarPlatos,
  },
  {
    id: "activar-menu",
    title: "Activá tus menús",
    description: "A diferencia de tu página, podés tener varios menús activos al mismo tiempo: por ejemplo uno fijo y uno de temporada.",
    Visual: ActivarMenu,
  },
  {
    id: "compartir",
    title: "Compartí tu página y tu menú",
    description: "Descargá el código QR para tus mesas y compartí el link de tu página o de tu menú por donde quieras.",
    Visual: CompartirTodo,
  },
];
