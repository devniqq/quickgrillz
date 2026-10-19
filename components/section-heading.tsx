import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-primary uppercase">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-pretty text-muted-foreground md:text-lg">{description}</p>}
    </div>
  )
}
