import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-display text-base font-extrabold tracking-tight", className)}>
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fff1c2] via-[#f0bd4f] to-[#a8741c] text-[11px] font-extrabold text-[#1a1408] shadow-[0_0_20px_-4px_#f0bd4f]"
      >
        Q
      </span>
      <span>
        QUICK<span className="text-gold-gradient">GRILLZ</span>
      </span>
    </span>
  )
}
