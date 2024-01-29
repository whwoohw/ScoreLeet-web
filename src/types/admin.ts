import { Timestamp } from "firebase/firestore";

export interface AnswersData {
  id: string;
  score: number;
  answers: number[];
  createdAt: Timestamp;
}
