interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export function StatCard({ label, value, sub, accent = false }: StatCardProps) {
  return (
    <div
      className={[
        'rounded-md border p-4 flex flex-col gap-1',
        accent
          ? 'border-[rgba(74,222,128,0.2)] bg-[var(--green-faint)]'
          : 'border-[var(--border)] bg-[var(--bg-3)]',
      ].join(' ')}
    >
      <p className="text-[10px] text-[var(--text-3)] tracking-widest uppercase font-mono">
        {label}
      </p>
      <p
        className={[
          'text-2xl font-display font-700 tabular-nums',
          accent ? 'text-[var(--green)]' : 'text-[var(--text)]',
        ].join(' ')}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-[var(--text-3)]">{sub}</p>}
    </div>
  )
}
