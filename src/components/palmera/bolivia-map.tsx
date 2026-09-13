import Link from "next/link";

interface MapCommunity {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}

const LON_MIN = -70;
const LON_MAX = -57.5;
const LAT_MIN = -23;
const LAT_MAX = -9.5;
const W = 420;
const H = 520;

function project(lng: number, lat: number): [number, number] {
  const x = ((lng - LON_MIN) / (LON_MAX - LON_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return [x, y];
}

const BOLIVIA_OUTLINE: [number, number][] = [
  [-69.6, -10.9],
  [-66.0, -9.9],
  [-63.5, -11.0],
  [-62.0, -12.9],
  [-59.5, -15.0],
  [-58.0, -16.8],
  [-58.0, -19.0],
  [-60.0, -21.5],
  [-62.0, -22.4],
  [-63.8, -22.0],
  [-66.0, -21.0],
  [-67.5, -21.6],
  [-69.0, -20.0],
  [-69.6, -17.0],
  [-69.7, -14.0],
];

export function BoliviaMap({ communities }: { communities: MapCommunity[] }) {
  const points = BOLIVIA_OUTLINE.map(
    ([lng, lat]) => project(lng, lat).join(","),
  ).join(" ");

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md">
        <polygon
          points={points}
          fill="#f0ede5"
          stroke="#c8882a"
          strokeWidth={2}
        />
        {communities.map((community) => {
          const [x, y] = project(community.lng, community.lat);
          return (
            <Link key={community.slug} href={`/comunidades/${community.slug}`}>
              <g className="cursor-pointer">
                <circle cx={x} cy={y} r={7} fill="#2d6a4f" />
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  fill="#1b2a4a"
                  fontSize={14}
                  fontWeight={600}
                >
                  {community.name}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
      <p className="mt-4 text-center text-xs text-palmera-muted">
        Mapa ilustrativo. El mapa interactivo (react-map-gl) se activa con
        NEXT_PUBLIC_MAPBOX_TOKEN.
      </p>
    </div>
  );
}
