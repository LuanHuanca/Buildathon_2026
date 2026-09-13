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
  const points = BOLIVIA_OUTLINE.map(([lng, lat]) =>
    project(lng, lat).join(","),
  ).join(" ");

  return (
    <div className="border-border/40 bg-surface-container-low relative overflow-hidden rounded-xl border p-6">
      <span className="absolute inset-0 bg-[radial-gradient(500px_300px_at_50%_0%,rgba(107,216,203,0.1),transparent)]" />
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md">
          <polygon
            points={points}
            fill="#181c1a"
            stroke="#ffb800"
            strokeOpacity={0.5}
            strokeWidth={2}
          />
          {communities.map((community) => {
            const [x, y] = project(community.lng, community.lat);
            return (
              <Link
                key={community.slug}
                href={`/comunidades/${community.slug}`}
              >
                <g className="cursor-pointer">
                  <circle
                    cx={x}
                    cy={y}
                    r={8}
                    fill="#6bd8cb"
                    fillOpacity={0.25}
                  />
                  <circle cx={x} cy={y} r={3.5} fill="#6bd8cb" />
                  <text
                    x={x}
                    y={y - 14}
                    textAnchor="middle"
                    fill="#f2dfd6"
                    fontSize={13}
                    fontWeight={600}
                  >
                    {community.name}
                  </text>
                </g>
              </Link>
            );
          })}
        </svg>
      </div>
      <div className="border-border/40 relative mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
          Sistema GEO_BOL // EPSG:4326
        </span>
        <span className="text-secondary font-mono text-[10px] tracking-widest uppercase">
          Mapa ilustrativo
        </span>
      </div>
    </div>
  );
}
