"use client"

import { ArrowDownRight, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { MATERIALS } from "@/lib/grillz"

const HeroScene = dynamic(() => import("./three/hero-scene"), { ssr: false })

const HERO_MATERIALS = [
  { ...MATERIALS[1], label: "18K Gelbgold" },
  { ...MATERIALS[0], label: "Chrom" },
  { ...MATERIALS[3], label: "18K Roségold" },
  { ...MATERIALS[2], label: "18K Weißgold" },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % HERO_MATERIALS.length), 3200)
    return () => window.clearInterval(id)
  }, [])

  const material = HERO_MATERIALS[active]

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-grid">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,oklch(0.83_0.14_84/0.18),transparent_60%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center select-none">
        <motion.span
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="text-chrome-gradient font-display text-[19vw] leading-none font-extrabold tracking-tighter opacity-90"
        >
          GRILLZ
        </motion.span>
      </div>

      <div className="absolute inset-0 z-10">
        <HeroScene color={material.color} isGold={material.id !== "chrom"} />
      </div>

      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-10 pt-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="flex items-center gap-2 self-start rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles className="size-3.5 text-primary" />
          Handgefertigt in Deutschland · Versand in 10–14 Tagen
        </motion.div>

        <div className="grid items-end gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.7 }}
              className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-6xl"
            >
              Dein Smile.
              <br />
              <span className="text-gold-gradient">In Gold gegossen.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.85 }}
              className="mt-4 max-w-md text-pretty text-muted-foreground md:text-lg"
            >
              Custom Grillz in Chrom, 10K, 14K & 18K Gold. Wähle ein Set oder gestalte jeden Zahn einzeln im
              3D-Konfigurator.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 1 }}
              className="pointer-events-auto mt-7 flex flex-wrap gap-3"
            >
              <a
                href="#konfigurator"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.83_0.14_84)] transition-transform hover:scale-[1.03]"
              >
                3D-Konfigurator starten
                <ArrowDownRight className="size-4 transition-transform group-hover:rotate-[-45deg]" />
              </a>
              <a
                href="#shop"
                className="inline-flex items-center rounded-full border border-border bg-white/5 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/10"
              >
                Shop ansehen
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="flex flex-col items-start gap-3 md:items-end"
          >
            <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Aktuelles Finish</p>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-2 pr-4 backdrop-blur-xl">
              <div className="flex gap-1.5">
                {HERO_MATERIALS.map((m, i) => (
                  <span
                    key={m.id}
                    aria-hidden="true"
                    className="size-6 rounded-full border border-white/20 transition-transform duration-500"
                    style={{ background: m.swatch, transform: i === active ? "scale(1.15)" : "scale(0.85)", opacity: i === active ? 1 : 0.5 }}
                  />
                ))}
              </div>
              <div className="relative h-6 w-32 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={material.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="absolute inset-0 font-display text-sm font-semibold"
                    aria-live="polite"
                  >
                    {material.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <dl className="mt-2 grid grid-cols-3 gap-6 text-left md:text-right">
              {[
                ["2.400+", "Pieces"],
                ["4.9/5", "Bewertung"],
                ["100%", "Custom Fit"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-xl font-extrabold">{value}</dd>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
