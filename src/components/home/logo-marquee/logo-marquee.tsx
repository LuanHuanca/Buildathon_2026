const MARKS = [
  "Altiplano",
  "Salar",
  "Amazonía",
  "Chipaya",
  "Ayoreo",
  "Guaraní",
  "Custodia",
  "On-chain",
];

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ?? undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {MARKS.map((mark) => (
        <li
          key={mark}
          className="text-muted-foreground font-mono text-[11px] tracking-[0.22em] uppercase"
        >
          {mark}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section
      aria-label="Territorios"
      className="border-border overflow-hidden border-y bg-[rgba(14,21,18,0.65)] py-4"
    >
      <div className="palmera-marquee-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
