export type GuessType = 'under' | 'over';

export interface PlayResponse {
  result: number;
  isWin: boolean;
}

export interface PlayErrorResponse {
  error: string;
}

export interface HistoryItem extends PlayResponse {
  id: string;
  threshold: number;
  guess: GuessType;
  time: string;
}
