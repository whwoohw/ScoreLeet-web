import { User } from "firebase/auth";
import { LeetYears } from "./leetAnswers";
import { NavigateFunction } from "react-router-dom";

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
