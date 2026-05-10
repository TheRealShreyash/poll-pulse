// src/hooks/useCountdown.ts
// Returns a human-readable time-left string that refreshes every 30s.

import { useState, useEffect } from 'react'

function fmt(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now()
  if (ms <= 0) return 'closing…'
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  if (h > 0) return `closes in ${h}h ${m}m`
  return `closes in ${m}m`
}

export function useCountdown(iso: string | null): string {
  const [label, setLabel] = useState(iso ? fmt(iso) : '')

  useEffect(() => {
    if (!iso) return
    setLabel(fmt(iso))
    const id = setInterval(() => setLabel(fmt(iso)), 30_000)
    return () => clearInterval(id)
  }, [iso])

  return label
}
