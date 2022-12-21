// This only contains properties that a user can interact with
export interface ITwitchRedemption {
  globalCooldown: number;
  paused: boolean;
  maxPerStream: number | null;
  maxPerUserPerStream: number | null;
  title: string;
  cost: number;
  enabled: boolean;
  prompt: string;
  background: string;
}