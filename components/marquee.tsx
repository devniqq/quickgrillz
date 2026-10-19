const ITEMS = ["Single Cap", "Double Cap", "Top 6", "Bottom 6", "Iced Out", "Diamond Cut", "Open Face", "18K Gold", "Chrom", "Roségold", "Custom Fit"]

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-extrabold tracking-tight uppercase md:text-2xl">
            {item}
            <span className="size-2 rotate-45 bg-primary-foreground" />
          </span>
        ))}
      </div>
    </div>
  )
}
