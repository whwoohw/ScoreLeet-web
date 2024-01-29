import { LeetYears } from "./leetAnswers";

export interface ScoreDetails {
  standardScore: number | null;
  percentile: number | null;
}

export interface LeetScores {
  averageScore: number;
  [score: number]: ScoreDetails;
}

export type LeetScoresData = Record<LeetYears, LeetScores>;
