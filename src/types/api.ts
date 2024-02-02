import { User } from "firebase/auth";
import { LeetTypes, LeetYears } from "./leetAnswers";
import { NavigateFunction } from "react-router-dom";

export interface handleAnswerSubmissionProps {
  answerInputs: (number | null | undefined)[];
  score: number;
  leetYear: LeetYears;
  leetType: LeetTypes;
  title: string;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export interface handleUserAnswerSubmissionProps {
  currentUser: User;
  answerInputs: (number | null | undefined)[];
  score: number;
  standardScore: number;
  percentile: number;
  leetYear: LeetYears;
  leetType: LeetTypes;
  title: string;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export interface handleUserTestSubmissionProps {
  currentUser: User;
  leetYear: LeetYears;
  languageAnswerInputs: (number | null | undefined)[];
  languageScore: number;
  languageStandardScore: number;
  languagePercentile: number;
  reasoningAnswerInputs: (number | null | undefined)[];
  reasoningScore: number;
  reasoningStandardScore: number;
  reasoningPercentile: number;
  navigate: NavigateFunction;
}
