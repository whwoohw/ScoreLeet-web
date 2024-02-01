import { QuestionArea, ScoreInsightsAreaData } from "@/types/scoreInsights";

export const getChartToolTipLabel = (chartToolTip: string | undefined) => {
  switch (chartToolTip) {
    case "language":
      return "언어이해";
    case "reasoning":
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
