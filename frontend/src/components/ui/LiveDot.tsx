interface LiveDotProps {
  label?: string
  size?: 'sm' | 'md'
}

export function LiveDot({ label = 'LIVE', size = 'md' }: LiveDotProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={[
          'relative rounded-full bg-[var(--green)]',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
        ].join(' ')}
      >
        <div
          className={[
            'absolute inset-0 rounded-full bg-[var(--green)] pulse-dot',
          ].join(' ')}
        />
        {/* Outer ring */}
        <div
          className={[
            'absolute rounded-full bg-[var(--green)] opacity-30',
            size === 'sm' ? '-inset-1' : '-inset-1.5',
            'animate-ping',
          ].join(' ')}
          style={{ animationDuration: '2s' }}
        />
      </div>
      <span className="text-[10px] tracking-widest font-mono text-[var(--green)]">
        {label}
      </span>
    </div>
  )
}
