import { useId } from "react"
import { ALL_TEETH, type ToothId } from "@/lib/grillz"
import { cn } from "@/lib/utils"

const SCALE = 64

export function ArchDiagram({ selected, className }: { selected: ToothId[]; className?: string }) {
  const gradientId = useId()
  const set = new Set(selected)
  const width = 3.4 * SCALE
  const height = 1.3 * SCALE

  return (
    <svg
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`${selected.length} ${selected.length === 1 ? "Zahn" : "Zähne"} ausgewählt`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff1c2" />
          <stop offset="45%" stopColor="#f0bd4f" />
          <stop offset="100%" stopColor="#a8741c" />
        </linearGradient>
      </defs>
      {ALL_TEETH.map((t) => {
        const w = t.width * Math.cos(t.rotY) * 0.9 * SCALE
        const h = t.height * SCALE * 0.95
        const x = t.x * SCALE - w / 2
        const lift = t.z * 6
        const y = t.arch === "top" ? -h - 2 + lift : 2 - lift
        const active = set.has(t.id)
        return (
          <rect
            key={t.id}
            x={x}
            y={y}
            width={Math.max(w, 1)}
            height={h}
            rx={Math.min(w, h) * 0.32}
            fill={active ? `url(#${gradientId})` : "oklch(1 0 0 / 0.08)"}
            stroke={active ? "#fff1c2" : "oklch(1 0 0 / 0.14)"}
            strokeWidth={0.8}
            className="transition-all duration-300"
          />
        )
      })}
    </svg>
  )
}
