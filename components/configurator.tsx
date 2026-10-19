"use client"

import { Check, Hand, MousePointerClick, RotateCcw, ShoppingBag } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import dynamic from "next/dynamic"
import {
  formatEuro,
  frontTeeth,
  getProduct,
  KARATS,
  MATERIALS,
  PRODUCTS,
  STYLES,
} from "@/lib/grillz"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"
import { useStore } from "./store-provider"

const ConfiguratorScene = dynamic(() => import("./three/configurator-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">3D-Modell wird geladen…</div>
  ),
})

function Step({ number, title, children, aside }: { number: string; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <legend className="flex items-center gap-3 font-display text-sm font-semibold">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-[11px] text-primary">{number}</span>
          {title}
        </legend>
        {aside}
      </div>
      {children}
    </fieldset>
  )
}

export function Configurator() {
  const { config, price, selectProduct, setArch, setMaterial, setKarat, setStyle, toggleTooth, addConfigToCart } = useStore()
  const product = getProduct(config.productId)
  const material = MATERIALS.find((m) => m.id === config.material)!
  const isGold = config.material !== "chrom"
  const showArch = product.kind === "arch" || product.kind === "caps"

  const hint =
    product.kind === "custom"
      ? "Klicke beliebige Zähne an, um sie hinzuzufügen oder zu entfernen."
      : product.kind === "caps"
        ? product.connected
          ? "Klicke einen Zahn – der Nachbarzahn wird automatisch verbunden."
          : `Klicke ${product.count === 1 ? "einen Zahn" : `${product.count} Zähne`}, um die Position${product.count === 1 ? "" : "en"} festzulegen.`
        : "Klicke einen Zahn, um zum individuellen Design zu wechseln."

  return (
    <section id="konfigurator" className="relative scroll-mt-20 border-y border-border bg-[oklch(0.11_0.004_80)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="3D-Konfigurator"
          title="Bau dein Grill. Zahn für Zahn."
          description="Drehe das Modell, wähle Zähne direkt per Klick und sieh Material, Karat und Style in Echtzeit."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative h-[58svh] min-h-[380px] overflow-hidden rounded-3xl border border-border bg-grid bg-card lg:h-[calc(100svh-8rem)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,oklch(0.83_0.14_84/0.12),transparent_65%)]"
              />
              <ConfiguratorScene
                selected={config.teeth}
                color={material.color}
                karat={config.karat}
                isGold={isGold}
                style={config.style}
                onToggle={toggleTooth}
              />
              <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
                <span className="rounded-full border border-border bg-background/60 px-3 py-1.5 font-display text-xs font-semibold backdrop-blur">
                  {product.name}
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                  {config.teeth.length} {config.teeth.length === 1 ? "Zahn" : "Zähne"}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-2xl border border-border bg-background/60 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur">
                <span className="flex items-center gap-1.5">
                  <MousePointerClick className="size-3.5 text-primary" />
                  {hint}
                </span>
                <span className="hidden items-center gap-1.5 sm:flex">
                  <Hand className="size-3.5 text-primary" />
                  Ziehen zum Drehen
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 md:p-7">
            <Step number="1" title="Modell">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectProduct(p.id)}
                    aria-pressed={config.productId === p.id}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all",
                      config.productId === p.id
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-white/25 hover:text-foreground",
                    )}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              {showArch && (
                <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1" role="radiogroup" aria-label="Kiefer">
                  {(["top", "bottom"] as const).map((arch) => (
                    <button
                      key={arch}
                      type="button"
                      role="radio"
                      aria-checked={config.arch === arch}
                      onClick={() => setArch(arch)}
                      className={cn(
                        "relative rounded-lg py-2 text-xs font-semibold transition-colors",
                        config.arch === arch ? "text-primary-foreground" : "text-muted-foreground",
                      )}
                    >
                      {config.arch === arch && (
                        <motion.span layoutId="arch-pill" className="absolute inset-0 rounded-lg bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                      )}
                      <span className="relative">{arch === "top" ? "Oberkiefer (Top)" : "Unterkiefer (Bottom)"}</span>
                    </button>
                  ))}
                </div>
              )}
              {product.kind === "custom" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "Top 6", teeth: frontTeeth("top", 6) },
                    { label: "Bottom 6", teeth: frontTeeth("bottom", 6) },
                    { label: "Top 10", teeth: frontTeeth("top", 10) },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        preset.teeth.forEach((t) => {
                          if (!config.teeth.includes(t)) toggleTooth(t)
                        })
                      }
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      + {preset.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => selectProduct("custom")}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RotateCcw className="size-3" /> Zurücksetzen
                  </button>
                </div>
              )}
            </Step>

            <Step number="2" title="Material" aside={<span className="text-xs text-muted-foreground">{material.name}</span>}>
              <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Material">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={config.material === m.id}
                    onClick={() => setMaterial(m.id)}
                    className={cn(
                      "group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                      config.material === m.id ? "border-primary bg-primary/10" : "border-border hover:border-white/25",
                    )}
                  >
                    <span
                      className="relative size-9 rounded-full shadow-inner ring-1 ring-white/20 transition-transform group-hover:scale-110"
                      style={{ background: m.swatch }}
                    >
                      {config.material === m.id && (
                        <Check className="absolute inset-0 m-auto size-4 text-black/70" aria-hidden="true" />
                      )}
                    </span>
                    <span className="text-[11px] font-semibold">{m.name}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step number="3" title="Karat" aside={!isGold && <span className="text-xs text-muted-foreground">Nur für Gold</span>}>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Karat">
                {KARATS.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    role="radio"
                    disabled={!isGold}
                    aria-checked={isGold && config.karat === k.id}
                    onClick={() => setKarat(k.id)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-all disabled:cursor-not-allowed disabled:opacity-35",
                      isGold && config.karat === k.id ? "border-primary bg-primary/10" : "border-border hover:border-white/25",
                    )}
                  >
                    <span className="block font-display text-base font-semibold">{k.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{k.note}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step number="4" title="Style">
              <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Style">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={config.style === s.id}
                    onClick={() => setStyle(s.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      config.style === s.id ? "border-primary bg-primary/10" : "border-border hover:border-white/25",
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{s.name}</span>
                      <span className="text-[11px] text-primary">{s.perTooth ? `+${formatEuro(s.perTooth)}/Zahn` : "inkl."}</span>
                    </span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">{s.description}</span>
                  </button>
                ))}
              </div>
            </Step>

            <div className="mt-2 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 via-transparent to-transparent p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Gesamtpreis inkl. MwSt.</p>
                  <div className="relative h-10 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.p
                        key={price}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-3xl font-extrabold"
                        aria-live="polite"
                      >
                        {formatEuro(price)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
                <p className="text-right text-[11px] text-muted-foreground">
                  {isGold ? `${material.name} ${KARATS.find((k) => k.id === config.karat)?.name}` : material.name}
                  <br />
                  {STYLES.find((s) => s.id === config.style)?.name} · {config.teeth.length}{" "}
                  {config.teeth.length === 1 ? "Zahn" : "Zähne"}
                </p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={addConfigToCart}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_oklch(0.83_0.14_84)] transition-transform hover:scale-[1.01]"
              >
                <ShoppingBag className="size-4" />
                In den Warenkorb
              </motion.button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Für die Anfertigung benötigst du ein Mold Kit – kostenlos ab 2 Zähnen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
