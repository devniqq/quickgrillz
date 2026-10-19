"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { formatEuro, PRODUCTS, startingPrice, type Product } from "@/lib/grillz"
import { cn } from "@/lib/utils"
import { ArchDiagram } from "./arch-diagram"
import { SectionHeading } from "./section-heading"
import { useStore } from "./store-provider"

const FILTERS: { id: string; label: string; match: (p: Product) => boolean }[] = [
  { id: "all", label: "Alle", match: () => true },
  { id: "caps", label: "Caps", match: (p) => p.kind === "caps" },
  { id: "sets", label: "Reihen & Sets", match: (p) => p.kind === "arch" || p.kind === "both" },
  { id: "custom", label: "Individuell", match: (p) => p.kind === "custom" },
]

export function ShopGrid() {
  const [filter, setFilter] = useState("all")
  const { selectProduct } = useStore()
  const products = PRODUCTS.filter(FILTERS.find((f) => f.id === filter)!.match)

  return (
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading eyebrow="Shop" title="Wähle dein Piece" description="Vom einzelnen Cap bis zum vollen Top & Bottom Set – jedes Piece wird nach deinem Abdruck gefertigt." />
        <div role="tablist" aria-label="Produkte filtern" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <motion.article
            layout
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary/0 blur-3xl transition-all duration-700 group-hover:bg-primary/20"
            />
            <div className="flex items-start justify-between">
              <span className="font-display text-xs text-muted-foreground">{String(PRODUCTS.indexOf(product) + 1).padStart(2, "0")}</span>
              {product.badge && (
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="relative my-8 px-2 transition-transform duration-700 group-hover:scale-105">
              <ArchDiagram selected={product.defaultTeeth} />
            </div>
            <div className="relative mt-auto">
              <h3 className="font-display text-xl font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted-foreground">{product.tagline}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  ab <span className="font-display text-lg font-semibold text-foreground">{formatEuro(startingPrice(product))}</span>
                </p>
                <button
                  type="button"
                  onClick={() => selectProduct(product.id, { scroll: true })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Konfigurieren
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
