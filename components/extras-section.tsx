"use client"

import { Check, Gift, Plus } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"
import { formatEuro } from "@/lib/grillz"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"
import { useStore } from "./store-provider"

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
}

const GIFT_AMOUNTS = [50, 100, 250, 500]

export function ExtrasSection() {
  const { addSimpleItem } = useStore()
  const [giftAmount, setGiftAmount] = useState(100)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 pb-24 md:px-8 md:pb-32">
      <motion.section {...reveal} id="mold-kit" className="grid scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/mold-kit.png`} alt="Quickgrillz Mold Kit mit Abdrucklöffeln und Abformmasse" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <SectionHeading eyebrow="Mold Kit" title="Dein Abdruck. Zuhause." description="Alles, was du für einen perfekten Abdruck brauchst – inklusive Schritt-für-Schritt-Anleitung und Rückversandlabel." />
          <ul className="mt-6 flex flex-col gap-2 text-sm">
            {["2× Abdrucklöffel (Top & Bottom)", "Thermoplastische Abformmasse", "Kostenloser Rückversand"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-primary" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-2xl font-extrabold">{formatEuro(40)}</span>
            <button
              type="button"
              onClick={() => addSimpleItem({ name: "Mold Kit", details: ["Abdruck-Set Top & Bottom"], price: 40 })}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Plus className="size-4" /> In den Warenkorb
            </button>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.section {...reveal} id="pflege" className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative aspect-[16/10]">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/care.png`} alt="Polierte Gold-Grillz auf einem Pflegetuch" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-1 flex-col p-8">
            <SectionHeading eyebrow="Wear & Care" title="Shine, der bleibt." />
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {[
                "Nach dem Tragen mit lauwarmem Wasser und weicher Bürste reinigen.",
                "Nicht beim Essen oder Schlafen tragen.",
                "Mit dem Poliertuch trocknen und in der Box aufbewahren.",
              ].map((tip, i) => (
                <li key={tip} className="flex gap-3">
                  <span className="font-display text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {tip}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <div>
                <p className="text-sm font-semibold">Pflegeset</p>
                <p className="text-xs text-muted-foreground">Bürste, Poliertuch & Reiniger</p>
              </div>
              <button
                type="button"
                onClick={() => addSimpleItem({ name: "Pflegeset", details: ["Bürste, Poliertuch & Reiniger"], price: 25 })}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="size-4" /> {formatEuro(25)}
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} id="gutscheine" className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative aspect-[16/10]">
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/gift-card.png`} alt="Schwarze Quickgrillz Geschenkkarte mit Goldrand" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="flex flex-1 flex-col p-8">
            <SectionHeading eyebrow="Gutscheine" title="Verschenke Gold." />
            <p className="mt-4 text-sm text-muted-foreground">Digitaler Gutschein per E-Mail – einlösbar für alle Pieces und Zubehör.</p>
            <div className="mt-6 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Gutscheinwert">
              {GIFT_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  role="radio"
                  aria-checked={giftAmount === amount}
                  onClick={() => setGiftAmount(amount)}
                  className={cn(
                    "rounded-xl border py-2.5 font-display text-sm font-semibold transition-all",
                    giftAmount === amount ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-white/25",
                  )}
                >
                  {amount} €
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addSimpleItem({ name: "Geschenkgutschein", details: [`Wert ${formatEuro(giftAmount)}`], price: giftAmount })}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] md:mt-8"
            >
              <Gift className="size-4" /> Gutschein über {formatEuro(giftAmount)} kaufen
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
