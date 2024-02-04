import { Timestamp } from "firebase/firestore";
import { LeetTypes, LeetYears, QuestionTypes } from "./leetAnswers";

export interface ScoreInsights {
  score: number;
  standardScore: number;
  percentile: number;
  answers: (number | null)[];
}

export type ScoreType = "score" | "standardScore" | "percentile";

export type ScoreInsightsData = Record<QuestionTypes, ScoreInsights> & {
  id: string;
  createdAt: Timestamp;
  year: LeetYears;
};

export type ScoreInsightsAreaData = Record<
  QuestionArea,
  {
    score: number;
    total: number;
  }
>;

export type QuestionDifficulty = "상" | "중" | "하";

export type QuestionArea =
  | "규범"
  | "인문"
  | "과학기술"
  | "사회"
  | "문예"
  | "국어"
  | "법규범"
  | "논리학수학"
  | "기타"
  | "인문사회";

export interface ExamReports {
  area: QuestionArea[];
  difficulty: QuestionDifficulty[];
  correctRate?: number[];
}

export type ExamReportsData = Record<LeetYears, Record<LeetTypes, ExamReports>>;

export interface AnswerReports {
  id: number;
  questionNumber: number;
  answerInput: number | string;
  answer: number;
  isAnswer: boolean;
  area: QuestionArea | string;
  difficulty: QuestionDifficulty | string;
}

export interface UserAnswersData {
  id: string;
  year: LeetYears;
  index: number;
  language: ScoreInsights;
  reasoning: ScoreInsights;
  createdAt: Timestamp;
}

export interface RadarChartData {
  name: string;
  value: string;
}

export interface YearScoreChartData {
  year: LeetYears;
  id: string;
  languageScore: number;
  languageStandardScore: number;
  languagePercentile: number;
  reasoningScore: number;
  reasoningStandardScore: number;
  reasoningPercentile: number;
}

export type UserChartScores = Record<LeetYears, YearScoreChartData[] | []>;
