export type Arch = "top" | "bottom"
export type ToothId = `${Arch}-${number}`

export type MaterialId = "chrom" | "gelbgold" | "weissgold" | "rosegold"
export type KaratId = "10k" | "14k" | "18k"
export type StyleId = "solid" | "openface" | "diamondcut" | "iced"

export type ProductKind = "caps" | "arch" | "both" | "custom"

export type Product = {
  id: string
  name: string
  tagline: string
  basePrice: number
  kind: ProductKind
  count?: number
  front?: 6 | 8 | 10
  defaultTeeth: ToothId[]
  connected: boolean
  badge?: string
}

export const TEETH_PER_ARCH = 16

const rankToIndex = (rank: number, side: 1 | -1) => (side === 1 ? 8 + rank : 7 - rank)

export function indexToRank(index: number) {
  return index >= 8 ? { rank: index - 8, side: 1 as const } : { rank: 7 - index, side: -1 as const }
}

export function frontTeeth(arch: Arch, count: number): ToothId[] {
  const half = count / 2
  const ids: ToothId[] = []
  for (let r = 0; r < half; r++) {
    ids.push(`${arch}-${rankToIndex(r, -1)}`, `${arch}-${rankToIndex(r, 1)}`)
  }
  return ids
}

export const PRODUCTS: Product[] = [
  {
    id: "single-cap",
    name: "Single Cap",
    tagline: "Ein Zahn. Ein Statement. Der perfekte Einstieg.",
    basePrice: 250,
    kind: "caps",
    count: 1,
    defaultTeeth: ["top-10"],
    connected: false,
    badge: "Bestseller",
  },
  {
    id: "double-cap",
    name: "Double Cap",
    tagline: "Zwei nebeneinanderliegende Zähne als ein Piece.",
    basePrice: 320,
    kind: "caps",
    count: 2,
    defaultTeeth: ["top-9", "top-10"],
    connected: true,
  },
  {
    id: "two-single-caps",
    name: "2 Single Caps",
    tagline: "Zwei einzelne Caps – frei positionierbar.",
    basePrice: 370,
    kind: "caps",
    count: 2,
    defaultTeeth: ["top-5", "top-10"],
    connected: false,
  },
  {
    id: "four-single-caps",
    name: "4 Single Caps",
    tagline: "Vier einzelne Caps für maximalen Kontrast.",
    basePrice: 690,
    kind: "caps",
    count: 4,
    defaultTeeth: ["top-5", "top-10", "bottom-5", "bottom-10"],
    connected: false,
    badge: "Neu",
  },
  {
    id: "six",
    name: "Top 6 / Bottom 6",
    tagline: "Die Klassiker-Reihe: sechs Frontzähne, oben oder unten.",
    basePrice: 800,
    kind: "arch",
    front: 6,
    defaultTeeth: frontTeeth("top", 6),
    connected: true,
  },
  {
    id: "six-both",
    name: "Top & Bottom 6",
    tagline: "Volles Set: sechs oben, sechs unten.",
    basePrice: 1520,
    kind: "both",
    front: 6,
    defaultTeeth: [...frontTeeth("top", 6), ...frontTeeth("bottom", 6)],
    connected: true,
  },
  {
    id: "eight",
    name: "Top 8 / Bottom 8",
    tagline: "Breiter Look bis zu den Prämolaren.",
    basePrice: 1040,
    kind: "arch",
    front: 8,
    defaultTeeth: frontTeeth("top", 8),
    connected: true,
  },
  {
    id: "eight-both",
    name: "Top & Bottom 8",
    tagline: "Acht oben, acht unten – kompromisslos.",
    basePrice: 1980,
    kind: "both",
    front: 8,
    defaultTeeth: [...frontTeeth("top", 8), ...frontTeeth("bottom", 8)],
    connected: true,
  },
  {
    id: "ten",
    name: "Top 10 / Bottom 10",
    tagline: "Zehn Zähne. Volle Präsenz bei jedem Lächeln.",
    basePrice: 1280,
    kind: "arch",
    front: 10,
    defaultTeeth: frontTeeth("top", 10),
    connected: true,
  },
  {
    id: "ten-both",
    name: "Top & Bottom 10",
    tagline: "Das Maximum. Für die, die keine halben Sachen machen.",
    basePrice: 2480,
    kind: "both",
    front: 10,
    defaultTeeth: [...frontTeeth("top", 10), ...frontTeeth("bottom", 10)],
    connected: true,
    badge: "Full Set",
  },
  {
    id: "custom",
    name: "Individuell",
    tagline: "Wähle jeden Zahn selbst – dein Design, deine Regeln.",
    basePrice: 110,
    kind: "custom",
    defaultTeeth: ["top-6", "top-7", "top-8", "top-9", "bottom-7", "bottom-8"],
    connected: false,
    badge: "Custom",
  },
]

export const CUSTOM_PRICE_PER_TOOTH = 140

export const MATERIALS: { id: MaterialId; name: string; color: string; swatch: string }[] = [
  { id: "chrom", name: "Chrom", color: "#d4d8de", swatch: "linear-gradient(135deg,#f4f6f8,#9aa1ab 55%,#e6e9ed)" },
  { id: "gelbgold", name: "Gelbgold", color: "#f0bd4f", swatch: "linear-gradient(135deg,#fde69a,#d49a2a 55%,#f6d06b)" },
  { id: "weissgold", name: "Weißgold", color: "#ebe6da", swatch: "linear-gradient(135deg,#ffffff,#c9c4b8 55%,#f1ede4)" },
  { id: "rosegold", name: "Roségold", color: "#eba48a", swatch: "linear-gradient(135deg,#fcd5c4,#c97a60 55%,#f0b39b)" },
]

export const KARATS: { id: KaratId; name: string; multiplier: number; note: string }[] = [
  { id: "10k", name: "10K", multiplier: 1.4, note: "41,7 % Gold" },
  { id: "14k", name: "14K", multiplier: 1.75, note: "58,5 % Gold" },
  { id: "18k", name: "18K", multiplier: 2.2, note: "75 % Gold" },
]

export const STYLES: { id: StyleId; name: string; description: string; perTooth: number }[] = [
  { id: "solid", name: "Solid", description: "Klassisch poliert, vollflächig", perTooth: 0 },
  { id: "openface", name: "Open Face", description: "Rahmen mit sichtbarem Zahn", perTooth: 25 },
  { id: "diamondcut", name: "Diamond Cut", description: "Facettierter Schliff, extra Glanz", perTooth: 45 },
  { id: "iced", name: "Iced Out", description: "Voll besetzt mit Zirkonia-Steinen", perTooth: 220 },
]

export type Config = {
  productId: string
  arch: Arch
  teeth: ToothId[]
  material: MaterialId
  karat: KaratId
  style: StyleId
}

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]

export function calculatePrice(config: Config) {
  const product = getProduct(config.productId)
  const count = config.teeth.length
  const base =
    product.kind === "custom" ? product.basePrice + count * CUSTOM_PRICE_PER_TOOTH : product.basePrice
  const multiplier =
    config.material === "chrom" ? 1 : (KARATS.find((k) => k.id === config.karat)?.multiplier ?? 1)
  const stylePerTooth = STYLES.find((s) => s.id === config.style)?.perTooth ?? 0
  const total = base * multiplier + stylePerTooth * count
  return Math.round(total / 10) * 10
}

export function startingPrice(product: Product) {
  if (product.kind === "custom") return product.basePrice + CUSTOM_PRICE_PER_TOOTH
  return product.basePrice
}

export const formatEuro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)

const UPPER = {
  widths: [0.34, 0.27, 0.27, 0.25, 0.24, 0.34, 0.32, 0.3],
  heights: [0.58, 0.5, 0.58, 0.47, 0.44, 0.4, 0.37, 0.33],
  depths: [0.17, 0.17, 0.23, 0.27, 0.27, 0.34, 0.33, 0.31],
}
const LOWER = {
  widths: [0.22, 0.23, 0.26, 0.25, 0.25, 0.35, 0.33, 0.3],
  heights: [0.44, 0.44, 0.5, 0.42, 0.4, 0.36, 0.34, 0.31],
  depths: [0.15, 0.16, 0.22, 0.26, 0.27, 0.33, 0.32, 0.3],
}

export type ToothLayout = {
  id: ToothId
  arch: Arch
  index: number
  rank: number
  x: number
  y: number
  z: number
  rotY: number
  width: number
  height: number
  depth: number
}

export function layoutArch(arch: Arch): ToothLayout[] {
  const dims = arch === "top" ? UPPER : LOWER
  const radius = arch === "top" ? 1.62 : 1.48
  const stretch = 1.12
  const gap = 0.012
  const layout: ToothLayout[] = []

  for (let index = 0; index < TEETH_PER_ARCH; index++) {
    const { rank, side } = indexToRank(index)
    let arc = 0
    for (let r = 0; r < rank; r++) arc += dims.widths[r] + gap
    arc += dims.widths[rank] / 2
    const theta = (side * arc) / radius
    const x = radius * Math.sin(theta)
    const z = radius * stretch * (Math.cos(theta) - 1) + (arch === "bottom" ? -0.07 : 0)
    const rotY = Math.atan2(stretch * Math.sin(theta), Math.cos(theta))
    const height = dims.heights[rank]
    const y = arch === "top" ? 0.03 + height / 2 : -0.03 - height / 2
    layout.push({
      id: `${arch}-${index}`,
      arch,
      index,
      rank,
      x,
      y,
      z,
      rotY,
      width: dims.widths[rank],
      height,
      depth: dims.depths[rank],
    })
  }
  return layout
}

export const ALL_TEETH: ToothLayout[] = [...layoutArch("top"), ...layoutArch("bottom")]
