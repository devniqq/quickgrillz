import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeading } from "./section-heading"

const FAQS = [
  {
    q: "Wie lange dauert die Anfertigung?",
    a: "Nach Eingang deines Abdrucks fertigen wir dein Piece in 10–14 Werktagen. Der Versand ist versichert und innerhalb Deutschlands kostenlos.",
  },
  {
    q: "Brauche ich ein Mold Kit?",
    a: "Ja, jedes Piece wird nach deinem individuellen Abdruck gefertigt. Ab 2 Zähnen ist das Mold Kit kostenlos inklusive.",
  },
  {
    q: "Was ist der Unterschied zwischen 10K, 14K und 18K?",
    a: "Die Karatzahl beschreibt den Goldanteil: 10K enthält 41,7 %, 14K 58,5 % und 18K 75 % Feingold. Je höher, desto satter die Farbe und desto höher der Wert.",
  },
  {
    q: "Was ist der Unterschied zwischen Double Cap und 2 Single Caps?",
    a: "Ein Double Cap verbindet zwei nebeneinanderliegende Zähne zu einem Piece. 2 Single Caps sind zwei separate Caps, die du frei positionieren kannst.",
  },
  {
    q: "Kann ich beim Tragen essen oder trinken?",
    a: "Wir empfehlen, Grillz beim Essen herauszunehmen. Wasser trinken ist problemlos möglich.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 pb-24 md:grid-cols-[1fr_1.4fr] md:px-8 md:pb-32">
      <SectionHeading eyebrow="FAQ" title="Fragen? Antworten." description="Noch etwas unklar? Schreib uns jederzeit an hello@quickgrillz.de." />
      <Accordion className="rounded-3xl border border-border bg-card px-6">
        {FAQS.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q}>
            <AccordionTrigger className="py-5 text-left font-display text-sm font-semibold md:text-base">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
