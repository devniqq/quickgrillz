import { Logo } from "./logo"

const COLUMNS = [
  { title: "Shop", links: [["Single Cap", "#shop"], ["Top 6 / Bottom 6", "#shop"], ["Individuell", "#konfigurator"], ["Gutscheine", "#gutscheine"]] },
  { title: "Service", links: [["Mold Kit", "#mold-kit"], ["Wear & Care", "#pflege"], ["FAQ", "#faq"], ["Kontakt", "mailto:hello@quickgrillz.de"]] },
  { title: "Rechtliches", links: [["Impressum", "#"], ["Datenschutz", "#"], ["AGB", "#"], ["Widerruf", "#"]] },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)] md:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Custom Grillz, handgefertigt in Deutschland. Chrom, Gold, Iced Out – passgenau nach deinem Abdruck.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{col.title}</h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p aria-hidden="true" className="text-chrome-gradient -mb-[0.2em] text-center font-display text-[17vw] leading-none font-extrabold tracking-tighter opacity-20 select-none">
        QUICKGRILLZ
      </p>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Quickgrillz. Alle Rechte vorbehalten.
      </p>
    </footer>
  )
}
