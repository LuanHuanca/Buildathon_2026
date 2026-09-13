export type DemoTourismImage = {
  src: string;
  alt: string;
};

export type PrototypeTourismRoute = {
  id: string;
  name: string;
  duration: string;
  location: string;
  priceUSDC: number;
  communityPercent: number;
  includes: string[];
  gallery: DemoTourismImage[];
  description: string;
};

export const TOURISM_DEMO_DISCLAIMER =
  "Rutas, precios y distribuciones son prototipos de demostración. No constituyen ofertas comerciales y la reserva o el pago no están habilitados.";

export const prototypeTourismRoutes = [
  {
    id: "prototipo-lagunas-altiplano",
    name: "PROTOTIPO · Guardianes de las lagunas",
    duration: "2 días · 1 noche",
    location: "Altiplano de La Paz, Bolivia",
    priceUSDC: 148,
    communityPercent: 72,
    includes: [
      "Acompañamiento de guía comunitario",
      "Alimentación local referencial",
      "Taller de lectura del paisaje",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=1400&q=85",
        alt: "Laguna de montaña y cordillera, imagen referencial del prototipo",
      },
      {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
        alt: "Cordillera iluminada al amanecer, imagen referencial",
      },
    ],
    description:
      "Recorrido conceptual de baja escala centrado en la observación de humedales, la memoria del agua y prácticas responsables en altura.",
  },
  {
    id: "prototipo-camino-del-tejido",
    name: "PROTOTIPO · Camino del tejido vivo",
    duration: "1 día",
    location: "Valles de Cochabamba, Bolivia",
    priceUSDC: 86,
    communityPercent: 78,
    includes: [
      "Encuentro demostrativo con taller local",
      "Muestra de fibras y tintes naturales",
      "Almuerzo comunitario referencial",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1400&q=85",
        alt: "Textiles artesanales coloridos, imagen referencial del prototipo",
      },
      {
        src: "https://images.unsplash.com/photo-1528399783831-8318d62d10e5?auto=format&fit=crop&w=1000&q=85",
        alt: "Detalle de un tejido elaborado a mano, imagen referencial",
      },
    ],
    description:
      "Experiencia prototipo para acercarse al ciclo de la fibra y conversar sobre atribución, comercio justo y continuidad de los saberes textiles.",
  },
  {
    id: "prototipo-bosque-y-cacao",
    name: "PROTOTIPO · Bosque, cacao y comunidad",
    duration: "3 días · 2 noches",
    location: "Amazonía de Beni, Bolivia",
    priceUSDC: 214,
    communityPercent: 75,
    includes: [
      "Traslados locales referenciales",
      "Caminata interpretativa",
      "Demostración del proceso del cacao",
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85",
        alt: "Bosque tropical visto desde un sendero, imagen referencial del prototipo",
      },
      {
        src: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=1000&q=85",
        alt: "Frutos de cacao maduros, imagen referencial",
      },
    ],
    description:
      "Itinerario conceptual sobre biodiversidad y economías del bosque, planteado para grupos pequeños y bajo acuerdos definidos por la comunidad.",
  },
] satisfies PrototypeTourismRoute[];
