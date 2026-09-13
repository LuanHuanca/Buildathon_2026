"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  MAP_CATEGORY_COLORS,
  MAP_POINTS,
  type MapCategory,
  type MapPoint,
} from "~/content/map-points";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "~/components/ui/modal";

const CENTER: [number, number] = [-16.2902, -63.5887];
const BOUNDS: [[number, number], [number, number]] = [
  [-24.8, -72.2],
  [-8.6, -55.8],
];

export interface MapCommunity {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}

const CATEGORY_LABELS: Record<MapCategory, string> = {
  comunidad: "Comunidades",
  patrimonio: "Patrimonio",
  turismo: "Turismo",
  investigacion: "Investigación",
};

export function BoliviaLeaflet({
  communities: _communities,
}: {
  communities: MapCommunity[];
}) {
  const [category, setCategory] = useState<MapCategory | "todos">("todos");
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const points = useMemo(
    () =>
      category === "todos"
        ? MAP_POINTS
        : MAP_POINTS.filter((point) => point.category === category),
    [category],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" aria-label="Filtrar mapa">
        <button
          type="button"
          onClick={() => setCategory("todos")}
          className={`rounded-full border px-3 py-1.5 text-xs transition ${
            category === "todos"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground"
          }`}
        >
          Todos
        </button>
        {(Object.keys(CATEGORY_LABELS) as MapCategory[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              category === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            {CATEGORY_LABELS[key]}
          </button>
        ))}
      </div>
      <div className="surface-card overflow-hidden">
        <MapContainer
          center={CENTER}
          zoom={6}
          minZoom={5}
          maxBounds={BOUNDS}
          maxBoundsViscosity={0.85}
          scrollWheelZoom
          className="z-0 h-[520px] w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
          {points.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={10}
              pathOptions={{
                color: MAP_CATEGORY_COLORS[point.category],
                fillColor: MAP_CATEGORY_COLORS[point.category],
                fillOpacity: 0.9,
                weight: 2,
              }}
              eventHandlers={{ click: () => setSelected(point) }}
              className="map-marker-pulse"
            />
          ))}
        </MapContainer>
      </div>
      <p className="text-muted-foreground text-xs">
        Selecciona un punto para conocer su historia, imágenes y meta.
      </p>

      <Modal
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <ModalContent className="overflow-hidden p-0">
          {selected ? (
            <>
              {/* Contenido fotográfico ilustrativo para la demostración. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.images[0]}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6">
                <ModalHeader>
                  <p className="text-primary font-mono text-[11px] tracking-wider uppercase">
                    {CATEGORY_LABELS[selected.category]} · {selected.region}
                  </p>
                  <ModalTitle className="font-display text-2xl">
                    {selected.name}
                  </ModalTitle>
                  <ModalDescription>{selected.description}</ModalDescription>
                </ModalHeader>
                {selected.goal ? (
                  <p className="text-muted-foreground mt-4 font-mono text-xs">
                    {selected.raised?.toLocaleString("es-BO")} /{" "}
                    {selected.goal.toLocaleString("es-BO")} USDC
                  </p>
                ) : null}
                {selected.href ? (
                  <Link
                    href={selected.href}
                    className="bg-primary text-primary-foreground mt-5 inline-flex rounded-lg px-4 py-2 text-sm font-semibold"
                  >
                    Ver experiencia completa
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </div>
  );
}
