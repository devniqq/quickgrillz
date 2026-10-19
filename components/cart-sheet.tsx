"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatEuro } from "@/lib/grillz"
import { useStore } from "./store-provider"

export function CartSheet() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeItem } = useStore()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full gap-0 border-border bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-6">
          <SheetTitle className="font-display text-lg">Warenkorb</SheetTitle>
          <SheetDescription>
            {cart.length === 0 ? "Noch nichts drin." : `${cart.reduce((s, i) => s + i.quantity, 0)} Artikel`}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="size-6 text-primary" />
            </span>
            <p className="text-sm text-muted-foreground">Gestalte dein erstes Piece im Konfigurator.</p>
            <a
              href="#konfigurator"
              onClick={() => setCartOpen(false)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Zum Konfigurator
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 p-6">
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.details.join(" · ")}</p>
                    <div className="mt-3 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border hover:bg-white/5"
                        aria-label={`${item.name} Menge verringern`}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border hover:bg-white/5"
                        aria-label={`${item.name} Menge erhöhen`}
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-display text-sm font-semibold">{formatEuro(item.price * item.quantity)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={`${item.name} entfernen`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Zwischensumme</span>
                <span className="font-display text-xl font-extrabold">{formatEuro(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Inkl. MwSt. · Kostenloser Versand</p>
              <button
                type="button"
                onClick={() => toast("Checkout wird in Kürze freigeschaltet", { description: "Zahlungsanbieter noch nicht verbunden." })}
                className="mt-4 w-full rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                Zur Kasse
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
