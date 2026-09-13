export type DemoResearcher = {
  id: string;
  name: string;
  photo: {
    src: string;
    alt: string;
  };
  specialty: string;
  institution: string;
  activeProject: string;
  bio: string;
  lockAddress?: `0x${string}`;
};

export const RESEARCHERS_DEMO_DISCLAIMER =
  "Perfiles representativos creados para esta demostración. No corresponden a personas reales ni afirman afiliaciones institucionales verificadas.";

const configuredLockAddress = process.env.NEXT_PUBLIC_MUNAY_LOCK_ADDRESS;

export const demoResearcherLockAddress: `0x${string}` | undefined =
  configuredLockAddress?.match(/^0x[a-fA-F0-9]{40}$/)
    ? (configuredLockAddress as `0x${string}`)
    : undefined;

export const demoResearchers = [
  {
    id: "demo-elena-quispe",
    name: "DEMO · Elena Quispe",
    photo: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
      alt: "Retrato ilustrativo para el perfil demo de Elena Quispe",
    },
    specialty: "Memoria oral y archivos comunitarios",
    institution: "Institución prototipo · Laboratorio de Saberes Vivos",
    activeProject: "Atlas sonoro comunitario del altiplano",
    bio: "Perfil representativo de una investigadora que acompaña procesos de documentación oral con consentimiento, atribución y custodia comunitaria.",
    lockAddress: demoResearcherLockAddress,
  },
  {
    id: "demo-mateo-ticona",
    name: "DEMO · Mateo Ticona",
    photo: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      alt: "Retrato ilustrativo para el perfil demo de Mateo Ticona",
    },
    specialty: "Agroecología andina y agua",
    institution: "Institución prototipo · Observatorio de Territorios",
    activeProject: "Monitoreo participativo de bofedales",
    bio: "Perfil ficticio que muestra cómo podrían presentarse metodologías de investigación participativa sobre agua, cultivos nativos y adaptación climática.",
    lockAddress: demoResearcherLockAddress,
  },
  {
    id: "demo-amalia-vargas",
    name: "DEMO · Amalia Vargas",
    photo: {
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
      alt: "Retrato ilustrativo para el perfil demo de Amalia Vargas",
    },
    specialty: "Patrimonio textil y diseño regenerativo",
    institution: "Institución prototipo · Taller Trama Abierta",
    activeProject: "Catálogo de tintes naturales y trazabilidad",
    bio: "Perfil representativo orientado a protocolos de catalogación que reconocen la autoría colectiva y evitan divulgar conocimientos sensibles.",
    lockAddress: demoResearcherLockAddress,
  },
] satisfies DemoResearcher[];
