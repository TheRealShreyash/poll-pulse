// src/components/ui/badge.tsx
type BadgeVariant = 'active' | 'draft' | 'closed' | 'published' | 'anon'

const STYLES: Record<BadgeVariant, string> = {
  active: 'bg-green-dim text-green-acc border border-green-bar/30',
  draft: 'bg-white/[0.04] text-ink-3 border border-white/[0.06]',
  closed: 'bg-white/[0.05] text-ink-2 border border-white/[0.08]',
  published: 'bg-sky-900/40 text-sky-400 border border-sky-700/40',
  anon: 'bg-amber-900/30 text-amber-400 border border-amber-700/30',
}

const LABELS: Record<BadgeVariant, string> = {
  active: 'Live',
  draft: 'Draft',
  closed: 'Closed',
  published: 'Published',
  anon: 'Anon',
}

export function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-[2px] rounded-full text-[10px] font-medium tracking-wide ${STYLES[variant]}`}
    >
      {variant === 'active' && (
        <span
          aria-hidden="true"
          className="w-[5px] h-[5px] rounded-full bg-green-acc animate-blink"
        />
      )}
      {LABELS[variant]}
    </span>
  )
}
