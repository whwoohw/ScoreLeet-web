import { Timestamp } from "firebase/firestore";
import { LeetTypes, LeetYears, QuestionTypes } from "./leetAnswers";

export interface ScoreInsights {
  id: string;
  score: number;
  standardScore: number;
  percentile: number;
  answers: (number | null)[];
  questionType: QuestionTypes;
  leetType: LeetTypes;
  createdAt: Timestamp;
}

export type ScoreInsightsData = Record<QuestionTypes, ScoreInsights[]>;

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

export type ExamReportsData = Record<
  Exclude<LeetYears, "2009" | "2010" | "2011">,
  Record<LeetTypes, ExamReports>
>;

export interface AnswerReports {
  id: number;
  questionNumber: number;
  answerInput: number | string;
  answer: number;
  isAnswer: boolean;
  area: QuestionArea | string;
  difficulty: QuestionDifficulty | string;
}
