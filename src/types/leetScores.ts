export interface ScoreDetails {
  standardScore: number | null;
  percentile: number | null;
}

export interface LeetScores {
  averageScore: number;
  [score: number]: ScoreDetails;
}
