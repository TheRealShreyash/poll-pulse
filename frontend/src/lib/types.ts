export type PollStatus = "DRAFT" | "LIVE" | "ENDED" | "PUBLISHED";

export interface PollOption {
  id: string;
  text: string;
  displayOrder: number;
  count: number;
}

export interface Poll {
  id: string;
  creatorId: string;
  title: string;
  description: string | null;
  status: PollStatus;
  isAnonymous: boolean;
  showLiveResults: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export interface PollWithOptions extends Poll {
  options: PollOption[];
  totalResponses: number;
}

export interface VelocityPoint {
  label: string;
  count: number;
}

export interface AnalyticsPoll extends PollWithOptions {
  shareUrl: string;
  velocity: VelocityPoint[];
}
