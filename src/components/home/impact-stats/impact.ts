export interface EditorialStat {
  id: string;
  label: string;
  value: number;
  note: string;
}

/** Editorial figures. Swap these when real totals exist. */
export const EDITORIAL_STATS: EditorialStat[] = [
  {
    id: "wallets",
    label: "Wallets en la crónica",
    value: 1840,
    note: "Cifra editorial",
  },
  {
    id: "trees",
    label: "Árboles en custodia",
    value: 4120,
    note: "Cifra editorial",
  },
  {
    id: "sites",
    label: "Sitios narrados",
    value: 28,
    note: "Cifra editorial",
  },
];
