import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const communities = [
  {
    slug: "uru-chipaya",
    name: "Uru Chipaya",
    department: "Oruro",
    lat: -19.0486,
    lng: -68.2,
    category: "environment",
    problem:
      "La desaparición del lago Poopó y la sequía prolongada amenazan la supervivencia de los Uru Chipaya y sus humedales milenarios.",
    description:
      "Los Uru Chipaya son una de las culturas vivas más antiguas de América. Habitan la cuenca del río Lauca, entre el Salar de Coipasa y el antiguo lago Poopó, donde han desarrollado una agricultura de camellones y el pastoreo de camélidos durante más de 4.000 años. Hoy enfrentan la crisis climática: sus fuentes de agua se secan, el lago Poopó desapareció y los jóvenes migran a las ciudades. Esta campaña financia la restauración de pozos, la reactivación de canales de riego y un programa de reforestación con especies nativas para recuperar los humedales que sostienen a la comunidad.",
    goalAmount: 25000,
    raisedAmount: 8400,
    status: "active",
    network: 43114,
    images: [],
    responsible: "Consejo de Ayllus Uru Chipaya",
    sections: [
      {
        title: "Historia y territorio",
        order: 0,
        isGated: false,
        items: [
          {
            type: "text",
            title: "Quiénes son los Uru Chipaya",
            body: "Los Uru son considerados el pueblo más antiguo de los Andes bolivianos. Los Chipaya, uno de sus tres grupos actuales, conservan su lengua uchru mataco y una arquitectura única de casas circulares de adobe.",
            order: 0,
          },
          {
            type: "text",
            title: "El territorio y el agua",
            body: "Su territorio se extiende entre el Salar de Coipasa y el desagüe del río Lauca. El agua no es solo un recurso: es el centro de su cosmovisión y de su sistema productivo de camellones.",
            order: 1,
          },
        ],
      },
      {
        title: "Plan de recuperación hídrica",
        order: 1,
        isGated: true,
        items: [
          {
            type: "text",
            title: "Etapa 1 — Pozos y canales",
            body: "Perforación de 6 pozos someros y rehabilitación de 12 km de canales de riego para devolver agua a los camellones de cultivo de quinua real y papa.",
            order: 0,
          },
          {
            type: "video",
            title: "Documental: sembrar en el desierto",
            body: "Video producido por la comunidad sobre el trabajo de recuperación de humedales.",
            mediaUrl: "",
            order: 1,
          },
        ],
      },
    ],
    updates: [
      {
        title: "Primer pozo en funcionamiento",
        body: "Con los primeros aportes perforamos el primer pozo en la zona de Ayparavi. Ya abastece de agua a 12 familias y a su rebaño de llamas.",
        images: [],
      },
      {
        title: "Reunión de planificación con el ayllu",
        body: "El consejo de ayllus definió las prioridades de riego para la próxima temporada de siembra junto a los técnicos locales.",
        images: [],
      },
    ],
    donations: [
      {
        walletAddress: "0x1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d",
        amountUsdc: 1500,
        txHash:
          "0x9a3f1c8d2b7e4a5f6d8c0b1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
      },
      {
        walletAddress: "0x2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f",
        amountUsdc: 600,
        txHash:
          "0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c",
      },
      {
        walletAddress: "0x3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f70",
        amountUsdc: 250,
        txHash:
          "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
      },
    ],
  },
  {
    slug: "tiwanaku",
    name: "Tiwanaku",
    department: "La Paz",
    lat: -16.5547,
    lng: -68.6733,
    category: "heritage",
    problem:
      "Faltan fondos para conservar los monumentos arqueológicos y fortalecer a las comunidades aymaras custodias del sitio.",
    description:
      "Tiwanaku es la capital de una de las civilizaciones más influyentes de los Andes prehispánicos y hoy un sitio declarado Patrimonio de la Humanidad por la UNESCO. La Puerta del Sol, el templo de Kalasasaya y la pirámide de Akapana reciben miles de visitantes, pero los recursos para su conservación son insuficientes. Las comunidades aymaras que custodian el sitio trabajan con arqueólogos locales para restaurar los monumentos y desarrollar un turismo cultural ético que devuelva los beneficios al territorio. Esta campaña financia la restauración de la pirámide de Akapana y un centro de interpretación gestionado por la propia comunidad.",
    goalAmount: 40000,
    raisedAmount: 18300,
    status: "active",
    network: 43114,
    images: [],
    responsible: "Centro Espiritual y Político de la Cultura Tiwanaku",
    sections: [
      {
        title: "El sitio y su gente",
        order: 0,
        isGated: false,
        items: [
          {
            type: "text",
            title: "Una capital andina",
            body: "Entre el 400 y el 1100 d.C., Tiwanaku fue el centro de un estado que influyó en gran parte de los Andes. Su arquitectura en piedra y su ingeniería agrícola siguen asombrando a los arqueólogos.",
            order: 0,
          },
          {
            type: "text",
            title: "Los custodios aymaras",
            body: "Las comunidades aymaras del entorno mantienen viva la relación espiritual con el sitio, celebrando el solsticio en la Puerta del Sol cada 21 de junio.",
            order: 1,
          },
        ],
      },
      {
        title: "Proyecto Akapana",
        order: 1,
        isGated: true,
        items: [
          {
            type: "text",
            title: "Restauración de la pirámide",
            body: "Plan de estabilización de la pirámide de Akapana con técnicas compatibles con el original, a cargo de arqueólogos bolivianos y mano de obra local.",
            order: 0,
          },
          {
            type: "text",
            title: "Centro de interpretación comunitaria",
            body: "Construcción de un espacio donde las propias comunidades guían a los visitantes y cuentan la historia del sitio desde su perspectiva.",
            order: 1,
          },
        ],
      },
    ],
    updates: [
      {
        title: "Inicio de los estudios de estabilización",
        body: "El equipo arqueológico completó el levantamiento topográfico de Akapana y comenzó las pruebas de consolidación de terrazas.",
        images: [],
      },
    ],
    donations: [
      {
        walletAddress: "0x4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f7081",
        amountUsdc: 3000,
        txHash:
          "0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
      },
      {
        walletAddress: "0x5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192",
        amountUsdc: 1200,
        txHash:
          "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
      },
      {
        walletAddress: "0x6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3",
        amountUsdc: 800,
        txHash:
          "0x5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a",
      },
    ],
  },
  {
    slug: "tarabuco",
    name: "Tarabuco",
    department: "Chuquisaca",
    lat: -19.1808,
    lng: -64.9148,
    category: "culture",
    problem:
      "Preservar el tejido Yampara y la fiesta del Pujllay, patrimonio de la humanidad, frente a la migración juvenil.",
    description:
      "Tarabuco es el corazón de la cultura Yampara, célebre por sus textiles tejidos a mano y por el Pujllay, una fiesta ancestral declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Las tejedoras de Tarabuco transmiten de generación en generación un lenguaje textil de diseños simbólicos, pero la migración de los jóvenes hacia las ciudades pone en riesgo esa cadena de transmisión. Esta campaña financia un taller-escuela de tejido para jóvenes, la documentación de los diseños tradicionales y la celebración del Pujllay con participación plena de la comunidad.",
    goalAmount: 18000,
    raisedAmount: 6250,
    status: "active",
    network: 43114,
    images: [],
    responsible: "Asociación de Tejedoras de Tarabuco",
    sections: [
      {
        title: "El arte del tejido",
        order: 0,
        isGated: false,
        items: [
          {
            type: "text",
            title: "Un lenguaje de hilos",
            body: "Cada diseño del tejido Yampara tiene un significado: la fertilidad, el ciclo del agua, los astros. Tejer es también narrar la historia del territorio.",
            order: 0,
          },
          {
            type: "text",
            title: "El Pujllay",
            body: "Celebrada tras la cosecha, el Pujllay reúne música, danza y comida en honor a la Pachamama. Fue reconocida por la UNESCO en 2014.",
            order: 1,
          },
        ],
      },
      {
        title: "Escuela de tejido",
        order: 1,
        isGated: true,
        items: [
          {
            type: "text",
            title: "Taller para jóvenes",
            body: "Espacio donde maestras tejedoras enseñan a las nuevas generaciones las técnicas y los significados de los diseños tradicionales.",
            order: 0,
          },
          {
            type: "text",
            title: "Catálogo de diseños",
            body: "Documentación fotográfica y registro de más de 40 diseños tradicionales para asegurar su preservación.",
            order: 1,
          },
        ],
      },
    ],
    updates: [
      {
        title: "Abrió el primer taller de tejido",
        body: "Quince jóvenes de la comunidad comenzaron sus clases con las maestras tejedoras. Las primeras piezas ya se están tejiendo.",
        images: [],
      },
    ],
    donations: [
      {
        walletAddress: "0x7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3",
        amountUsdc: 1000,
        txHash:
          "0x6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
      },
      {
        walletAddress: "0x8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4",
        amountUsdc: 450,
        txHash:
          "0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
      },
    ],
  },
];

async function main() {
  console.log("Seeding Palmera database...");

  await prisma.donation.deleteMany();
  await prisma.communityUpdate.deleteMany();
  await prisma.contentItem.deleteMany();
  await prisma.communitySection.deleteMany();
  await prisma.community.deleteMany();

  for (const c of communities) {
    const { sections, updates, donations, ...communityData } = c;

    const community = await prisma.community.create({
      data: {
        ...communityData,
        sections: {
          create: sections.map((section) => ({
            title: section.title,
            order: section.order,
            isGated: section.isGated,
            items: {
              create: section.items.map((item) => ({
                type: item.type,
                title: item.title,
                body: item.body,
                mediaUrl: item.mediaUrl ?? null,
                order: item.order,
              })),
            },
          })),
        },
        updates: {
          create: updates.map((update) => ({
            title: update.title,
            body: update.body,
            images: update.images,
          })),
        },
        donations: {
          create: donations.map((donation) => ({
            walletAddress: donation.walletAddress,
            amountUsdc: donation.amountUsdc,
            txHash: donation.txHash,
            network: "avalanche",
          })),
        },
      },
    });

    console.log(`  ✓ ${community.name} (${community.slug})`);
  }

  console.log("Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
