import { CartSheet } from "@/components/cart-sheet"
import { Configurator } from "@/components/configurator"
import { ExtrasSection } from "@/components/extras-section"
import { FaqSection } from "@/components/faq-section"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { ProcessSection } from "@/components/process-section"
import { ShopGrid } from "@/components/shop-grid"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StoreProvider } from "@/components/store-provider"

export default function Page() {
  return (
    <StoreProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <ShopGrid />
        <Configurator />
        <ProcessSection />
        <ExtrasSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <CartSheet />
    </StoreProvider>
  )
}
