export interface HeroFrame {
  id: string;
  kicker: string;
  title: string;
  body: string;
  wash: string;
}

export const HERO_FRAMES: HeroFrame[] = [
  {
    id: "altiplano",
    kicker: "01 · Altiplano",
    title: "Noche sobre el tejado del mundo",
    body: "A más de tres mil metros, el viento guarda el ritmo de quienes custodian el agua.",
    wash: "radial-gradient(circle at 18% 78%, rgba(229,142,38,0.32), transparent 36%), linear-gradient(165deg, #3e322c 0%, #1a110c 68%)",
  },
  {
    id: "salar",
    kicker: "02 · Salar",
    title: "Polígonos de sal, pulso de litio",
    body: "El blanco no es vacío. Es un archivo mineral que las comunidades ya leen.",
    wash: "radial-gradient(circle at 70% 30%, rgba(255,178,189,0.18), transparent 32%), linear-gradient(180deg, #322822 0%, #1a110c 72%)",
  },
  {
    id: "amazonia",
    kicker: "03 · Amazonía",
    title: "Dosel que no cabe en un balance",
    body: "Bajo la cobertura, el idioma y el río comparten la misma cuenta de custodia.",
    wash: "radial-gradient(circle at 40% 80%, rgba(107,216,203,0.22), transparent 42%), linear-gradient(200deg, #231a14 0%, #150c08 70%)",
  },
  {
    id: "regeneracion",
    kicker: "04 · Regeneración",
    title: "Lo que vuelve al suelo, vuelve al registro",
    body: "Cada hito narrado deja una huella verificable, no una promesa en un PDF.",
    wash: "radial-gradient(circle at 50% 40%, rgba(255,184,112,0.22), transparent 38%), linear-gradient(180deg, #271d18 0%, #1a110c 74%)",
  },
];

export const HERO_OUTRO = "Custodia regenerativa, en cadena";
