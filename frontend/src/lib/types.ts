export type PollStatus = 'draft' | 'active' | 'closed' | 'published'

export interface PollOption {
  label: string
  count: number
}

export interface Poll {
  id: string
  title: string
  status: PollStatus
  isAnonymous: boolean
  showLiveResults: boolean
  requiresAuth: boolean
  options: PollOption[]
  totalResponses: number
  expiresAt: string | null // ISO
  createdAt: string
}

export interface VelocityPoint {
  label: string // e.g. "2h ago"
  count: number
}

export interface AnalyticsPoll extends Poll {
  shareUrl: string
  velocity: VelocityPoint[]
}
