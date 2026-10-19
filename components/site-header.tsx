"use client"

import { Menu, ShoppingBag } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { useStore } from "./store-provider"

const NAV = [
  { href: "#shop", label: "Shop" },
  { href: "#konfigurator", label: "Konfigurator" },
  { href: "#mold-kit", label: "Mold Kit" },
  { href: "#pflege", label: "Wear & Care" },
  { href: "#gutscheine", label: "Gutscheine" },
  { href: "#faq", label: "FAQ" },
]

export function SiteHeader() {
  const { cart, setCartOpen } = useStore()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24))
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6"
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-500",
          scrolled ? "border border-border bg-background/70 shadow-2xl shadow-black/40 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <a href="#top" aria-label="Quickgrillz Startseite">
          <Logo />
        </a>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#konfigurator"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Jetzt gestalten
          </a>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex size-10 items-center justify-center rounded-full border border-border bg-white/5 transition-colors hover:bg-white/10"
            aria-label={`Warenkorb öffnen, ${count} Artikel`}
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {count}
              </motion.span>
            )}
          </button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white/5 lg:hidden"
              aria-label="Menü öffnen"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs border-border bg-background p-6">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Logo />
              <nav aria-label="Mobile Navigation" className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 font-display text-lg transition-colors hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
