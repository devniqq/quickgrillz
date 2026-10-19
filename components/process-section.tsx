"use client"

import { motion } from "motion/react"
import { SectionHeading } from "./section-heading"

const STEPS = [
  { title: "Designen", text: "Wähle im 3D-Konfigurator Modell, Material, Karat und Style – oder jeden Zahn einzeln." },
  { title: "Abdruck nehmen", text: "Du erhältst unser Mold Kit nach Hause. Abdruck nehmen dauert nur 5 Minuten." },
  { title: "Handarbeit", text: "Unsere Goldschmiede gießen, schleifen und polieren dein Piece passgenau." },
  { title: "Shine", text: "Versicherter Versand in 10–14 Werktagen inklusive Pflegeset und Box." },
]

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow="So funktioniert's" title="In vier Schritten zum Custom Fit" />
      <ol className="mt-14 grid gap-4 md:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6"
          >
            <span className="text-gold-gradient font-display text-6xl font-extrabold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
