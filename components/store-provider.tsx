"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import {
  calculatePrice,
  frontTeeth,
  getProduct,
  KARATS,
  MATERIALS,
  STYLES,
  type Arch,
  type Config,
  type KaratId,
  type MaterialId,
  type StyleId,
  type ToothId,
} from "@/lib/grillz"

export type CartItem = {
  id: string
  name: string
  details: string[]
  price: number
  quantity: number
}

type StoreValue = {
  config: Config
  price: number
  selectProduct: (id: string, options?: { scroll?: boolean }) => void
  setArch: (arch: Arch) => void
  setMaterial: (material: MaterialId) => void
  setKarat: (karat: KaratId) => void
  setStyle: (style: StyleId) => void
  toggleTooth: (id: ToothId) => void
  cart: CartItem[]
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addConfigToCart: () => void
  addSimpleItem: (item: Omit<CartItem, "id" | "quantity">) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

const initialConfig: Config = {
  productId: "six",
  arch: "top",
  teeth: frontTeeth("top", 6),
  material: "gelbgold",
  karat: "14k",
  style: "solid",
}

const toothIndex = (id: ToothId) => Number(id.split("-")[1])
const toothArch = (id: ToothId) => id.split("-")[0] as Arch

export function StoreProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>(initialConfig)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const selectProduct = useCallback((id: string, options?: { scroll?: boolean }) => {
    setConfig((prev) => {
      const product = getProduct(id)
      const teeth =
        product.kind === "arch" && product.front ? frontTeeth(prev.arch, product.front) : product.defaultTeeth
      return { ...prev, productId: id, teeth }
    })
    if (options?.scroll) {
      document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const setArch = useCallback((arch: Arch) => {
    setConfig((prev) => {
      const product = getProduct(prev.productId)
      if (product.kind === "arch" && product.front) {
        return { ...prev, arch, teeth: frontTeeth(arch, product.front) }
      }
      if (product.kind === "caps") {
        return {
          ...prev,
          arch,
          teeth: prev.teeth.map((t) => `${arch}-${toothIndex(t)}` as ToothId),
        }
      }
      return { ...prev, arch }
    })
  }, [])

  const toggleTooth = useCallback((id: ToothId) => {
    setConfig((prev) => {
      const product = getProduct(prev.productId)
      const selected = prev.teeth.includes(id)

      if (product.kind === "custom") {
        if (selected && prev.teeth.length === 1) return prev
        return { ...prev, teeth: selected ? prev.teeth.filter((t) => t !== id) : [...prev.teeth, id] }
      }

      if (product.kind === "caps" && product.count) {
        if (product.connected) {
          const index = toothIndex(id)
          const arch = toothArch(id)
          const neighbor = index < 15 ? index + 1 : index - 1
          return { ...prev, arch, teeth: [id, `${arch}-${neighbor}` as ToothId] }
        }
        if (selected) return prev
        const next = [...prev.teeth, id]
        return { ...prev, teeth: next.slice(Math.max(0, next.length - product.count)) }
      }

      const teeth = selected ? prev.teeth.filter((t) => t !== id) : [...prev.teeth, id]
      if (teeth.length === 0) return prev
      return { ...prev, productId: "custom", teeth }
    })
  }, [])

  const price = useMemo(() => calculatePrice(config), [config])

  const addConfigToCart = useCallback(() => {
    const product = getProduct(config.productId)
    const material = MATERIALS.find((m) => m.id === config.material)!
    const karat = KARATS.find((k) => k.id === config.karat)!
    const style = STYLES.find((s) => s.id === config.style)!
    const details = [
      config.material === "chrom" ? material.name : `${material.name} ${karat.name}`,
      style.name,
      `${config.teeth.length} ${config.teeth.length === 1 ? "Zahn" : "Zähne"}`,
    ]
    if (product.kind === "arch") details.push(config.arch === "top" ? "Oben" : "Unten")
    setCart((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: product.name, details, price: calculatePrice(config), quantity: 1 },
    ])
    setCartOpen(true)
  }, [config])

  const addSimpleItem = useCallback((item: Omit<CartItem, "id" | "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name && p.price === item.price)
      if (existing) {
        return prev.map((p) => (p.id === existing.id ? { ...p, quantity: Math.min(10, p.quantity + 1) } : p))
      }
      return [...prev, { ...item, id: crypto.randomUUID(), quantity: 1 }]
    })
    setCartOpen(true)
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, quantity: Math.min(10, quantity) } : p)),
    )
  }, [])

  const removeItem = useCallback((id: string) => setCart((prev) => prev.filter((p) => p.id !== id)), [])

  const value: StoreValue = {
    config,
    price,
    selectProduct,
    setArch,
    setMaterial: (material) => setConfig((prev) => ({ ...prev, material })),
    setKarat: (karat) => setConfig((prev) => ({ ...prev, karat })),
    setStyle: (style) => setConfig((prev) => ({ ...prev, style })),
    toggleTooth,
    cart,
    cartOpen,
    setCartOpen,
    addConfigToCart,
    addSimpleItem,
    updateQuantity,
    removeItem,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
