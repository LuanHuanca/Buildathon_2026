export type MapCategory =
  "comunidad" | "patrimonio" | "turismo" | "investigacion";

export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  lat: number;
  lng: number;
  description: string;
  images: string[];
  href?: string;
  goal?: number;
  raised?: number;
  region: string;
}

export const MAP_CATEGORY_COLORS: Record<MapCategory, string> = {
  comunidad: "#ffb2bd",
  patrimonio: "#ffb870",
  turismo: "#6bd8cb",
  investigacion: "#a18d7c",
};

export const MAP_POINTS: MapPoint[] = [
  {
    id: "uru-chipaya",
    name: "Comunidad Uru Chipaya",
    category: "comunidad",
    lat: -19.0486,
    lng: -68.2,
    description:
      "Una cultura viva de más de cuatro mil años recupera pozos, canales y humedales ante la sequía.",
    images: [
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1000&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=80",
    ],
    href: "/comunidades/uru-chipaya",
    goal: 25000,
    raised: 8400,
    region: "Oruro",
  },
  {
    id: "tiwanaku",
    name: "Sitio arqueológico Tiwanaku",
    category: "patrimonio",
    lat: -16.5547,
    lng: -68.6733,
    description:
      "Custodios aymaras y arqueólogos bolivianos conservan la pirámide de Akapana.",
    images: [
      "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1000&q=80",
    ],
    href: "/comunidades/tiwanaku",
    goal: 40000,
    raised: 18300,
    region: "La Paz",
  },
  {
    id: "tarabuco",
    name: "Escuela de tejido Yampara",
    category: "comunidad",
    lat: -19.1808,
    lng: -64.9148,
    description:
      "Maestras tejedoras transmiten diseños, técnicas y memoria a jóvenes de Tarabuco.",
    images: [
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1000&q=80",
    ],
    href: "/comunidades/tarabuco",
    goal: 18000,
    raised: 6250,
    region: "Chuquisaca",
  },
  {
    id: "ruta-salar",
    name: "Guardianes del salar",
    category: "turismo",
    lat: -20.1338,
    lng: -67.4891,
    description:
      "Ruta de turismo comunitario por paisajes salinos y sistemas ancestrales de agua.",
    images: [
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1000&q=80",
    ],
    href: "/turismo",
    region: "Oruro",
  },
  {
    id: "archivo-lauca",
    name: "Observatorio hídrico del Lauca",
    category: "investigacion",
    lat: -18.58,
    lng: -68.56,
    description:
      "Investigadores y familias registran el nivel del agua y el estado de los bofedales.",
    images: [
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=1000&q=80",
    ],
    href: "/investigadores",
    region: "Oruro",
  },
  {
    id: "ruta-yampara",
    name: "Hilos Yampara",
    category: "turismo",
    lat: -19.08,
    lng: -64.98,
    description:
      "Experiencia de dos días con maestras tejedoras; 85% del precio vuelve a la comunidad.",
    images: [
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=1000&q=80",
    ],
    href: "/turismo",
    region: "Chuquisaca",
  },
];
export type DemoMapPointCategory =
  "comunidad" | "patrimonio" | "turismo" | "investigacion";

export type DemoMapPoint = {
  id: string;
  name: string;
  category: DemoMapPointCategory;
  coordinates: readonly [latitude: number, longitude: number];
  description: string;
  image: {
    src: string;
    alt: string;
    demo: true;
  };
  region: string;
  projectSlug?: string;
  goal?: number;
  raised?: number;
};

export const MAP_POINT_COLORS = {
  comunidad: "#ffb870",
  patrimonio: "#ffb2bd",
  turismo: "#6bd8cb",
  investigacion: "#70a7ff",
} as const satisfies Record<DemoMapPointCategory, `#${string}`>;

export const MAP_DATA_DEMO_DISCLAIMER =
  "Metadatos, ubicaciones, imágenes y cifras de este mapa son demostrativos; no representan proyectos activos ni ubicaciones operativas exactas.";

// DEMO METADATA: coordinates are approximate Bolivian reference points.
// Remote images are illustrative fixed Unsplash assets, not documentary evidence.
export const demoMapPoints = [
  {
    id: "demo-comunidad-uyuni",
    name: "DEMO · Red comunitaria del salar",
    category: "comunidad",
    coordinates: [-20.4597, -66.825],
    description:
      "Punto representativo de una red que imagina gobernanza local y monitoreo ambiental del territorio.",
    image: {
      src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1200&q=85",
      alt: "Paisaje de salar, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "Potosí",
    projectSlug: "red-salar-demo",
    goal: 18000,
    raised: 7300,
  },
  {
    id: "demo-comunidad-moxos",
    name: "DEMO · Custodios de humedales",
    category: "comunidad",
    coordinates: [-14.8347, -64.9044],
    description:
      "Prototipo de articulación comunitaria para registrar ciclos del agua y prácticas de cuidado.",
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
      alt: "Humedal verde al atardecer, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "Beni",
    goal: 12500,
    raised: 4100,
  },
  {
    id: "demo-patrimonio-tarabuco",
    name: "DEMO · Archivo de tramas",
    category: "patrimonio",
    coordinates: [-19.1817, -64.9156],
    description:
      "Archivo prototipo para explorar atribución colectiva, vocabularios textiles y acceso responsable.",
    image: {
      src: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=85",
      alt: "Textiles coloridos, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "Chuquisaca",
    projectSlug: "archivo-tramas-demo",
  },
  {
    id: "demo-patrimonio-tiwanaku",
    name: "DEMO · Memoria de piedra",
    category: "patrimonio",
    coordinates: [-16.5542, -68.6733],
    description:
      "Punto conceptual de mediación digital para narrativas patrimoniales con contexto y consentimiento.",
    image: {
      src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85",
      alt: "Arquitectura de piedra andina, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "La Paz",
  },
  {
    id: "demo-turismo-amboro",
    name: "DEMO · Sendero bosque y neblina",
    category: "turismo",
    coordinates: [-17.8375, -63.5803],
    description:
      "Ruta prototipo de grupos pequeños; no representa una reserva ni un servicio actualmente disponible.",
    image: {
      src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85",
      alt: "Sendero dentro de un bosque húmedo, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "Santa Cruz",
    goal: 9000,
    raised: 2950,
  },
  {
    id: "demo-investigacion-bofedal",
    name: "DEMO · Observatorio de bofedales",
    category: "investigacion",
    coordinates: [-18.213, -68.713],
    description:
      "Investigación prototipo sobre agua y biodiversidad con protocolos participativos de datos.",
    image: {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85",
      alt: "Paisaje altoandino abierto, imagen ilustrativa de datos demo",
      demo: true,
    },
    region: "Oruro",
    projectSlug: "observatorio-bofedales-demo",
    goal: 24000,
    raised: 9800,
  },
] satisfies DemoMapPoint[];
