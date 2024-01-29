import { LeetScores } from "@/types/leetScores";

export const getQuestionTypeLabel = (questionType: string) => {
  switch (questionType) {
    case "language":
      return "언어이해";
    case "reasoning":
      return "추리논증";
    case "언어이해":
      return "language";
    case "추리논증":
      return "reasoning";
    default:
      return "";
  }
};

export const countMatchingElements = (
  answerInputs: (number | null | undefined)[],
  answers: number[]
) => {
  let count = 0;

  answerInputs.forEach((element, index) => {
    if (element === answers[index]) {
      count++;
    }
  });

  return count;
};

export const getScoreAdditionalInfos = (
  scores: LeetScores,
  score: number,
  propertyName: "standardScore" | "percentile"
) => {
  return scores[score] && scores[score][propertyName] !== null
    ? scores[score][propertyName]!
    : 0;
};
