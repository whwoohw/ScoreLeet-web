import {
  QuestionArea,
  ScoreInsightsAreaData,
  UserChartScores,
} from "@/types/scoreInsights";

export const getChartToolTipLabel = (chartToolTip: string | undefined) => {
  switch (chartToolTip) {
    case "language":
      return "언어이해";
    case "languageScore":
      return "언어이해";
    case "languageStandardScore":
      return "언어이해";
    case "languagePercentile":
      return "언어이해";
    case "reasoning":
      return "추리논증";
    case "reasoningScore":
      return "추리논증";
    case "reasoningStandardScore":
      return "추리논증";
    case "reasoningPercentile":
      return "추리논증";
    case "score":
      return "내 점수";
    case "averageScore":
      return "평균점수";
    default:
      return "";
  }
};

interface CalculateAreaScoresProps {
  area: QuestionArea[];
  answers: number[];
  answerInputs: (number | null)[];
}

export const calculateAreaScores = ({
  area,
  answers,
  answerInputs,
}: CalculateAreaScoresProps) => {
  const result = {} as ScoreInsightsAreaData;

  // 데이터 구조 생성
  for (let i = 0; i < area.length; i++) {
    const key = area[i];

    if (!result[key]) {
      result[key] = { total: 0, score: 0 };
    }

    result[key].total++;
  }

  // 정답 처리 및 점수 계산
  for (let i = 0; i < answers.length; i++) {
    const key = area[i];

    if (answers[i] === answerInputs[i]) {
      result[key].score++;
    }
  }

  return result;
};

export const convertToRadarChartData = (input: ScoreInsightsAreaData) => {
  const result = Object.entries(input).map(([name, { total, score }]) => ({
    name,
    value: ((score / total) * 100).toFixed(1),
  }));

  return result;
};

export const getMaxValueLength = (groupedDocs: UserChartScores): number => {
  let maxLength = 0;

  Object.values(groupedDocs).forEach((value) => {
    if (Array.isArray(value)) {
      maxLength = Math.max(maxLength, value.length);
    }
  });

  return maxLength;
};

export const capitalizeFirstLetter = (inputString: string): string => {
  return `${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`;
};
