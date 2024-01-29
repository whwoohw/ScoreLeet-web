import { User } from "firebase/auth";
import { LeetTypes, LeetYears } from "./leetAnswers";

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
