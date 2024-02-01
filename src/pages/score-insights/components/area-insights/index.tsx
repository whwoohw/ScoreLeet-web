import CustomRadioGroup from "@/components/radio-group";
import { CustomRadarChart } from "@/components/score-insights-chart";
import { ScoreInsightsAreaTable } from "@/components/score-insights-table";
import { language, reasoning } from "@/data/leetAnswers";
import {
  languageExamReports,
  reasoningExamReports,
} from "@/data/scoreInsights";
import * as S from "@/pages/score-insights/components/area-insights/area-insights.styled";
import { LeetYears, QuestionTypes } from "@/types/leetAnswers";
import { ScoreInsightsData } from "@/types/scoreInsights";
import {
  calculateAreaScores,
  convertToRadarChartData,
} from "@/utils/scoreInsights";
import { useState } from "react";

interface ScoreInsightsAreaInsightsProps {
  leetYear: LeetYears;
  scoreInsights: ScoreInsightsData;
}

export default function ScoreInsightsAreaInsights({
  leetYear,
  scoreInsights,
}: ScoreInsightsAreaInsightsProps) {
  const [questionType, setQuestionType] = useState<QuestionTypes>("language");

  const languageAreaScore = calculateAreaScores({
    area: languageExamReports[leetYear].odd.area,
    answers: language[leetYear].odd,
    answerInputs:
      scoreInsights.language?.slice(-1)[0].answers ??
      language[leetYear].odd.map(() => {
        return null;
      }),
  });

  const reasoningAreaScore = calculateAreaScores({
    area: reasoningExamReports[leetYear].odd.area,
    answers: reasoning[leetYear].odd,
    answerInputs:
      scoreInsights.reasoning?.slice(-1)[0].answers ??
      reasoning[leetYear].odd.map(() => {
        return null;
      }),
  });

  return (
    <S.Wrapper>
      <S.AreaTableContainer>
        <ScoreInsightsAreaTable
          title="언어이해"
          areaScore={languageAreaScore}
        />

        <ScoreInsightsAreaTable
          title="추리논증"
          areaScore={reasoningAreaScore}
        />
      </S.AreaTableContainer>
      <S.AreaRadarChartContainer>
        <CustomRadioGroup
          title="시험 유형"
          isRow
          name="questionType"
          radioValue={questionType}
          changeRadio={(e) => setQuestionType(e.target.value as QuestionTypes)}
          radioItems={[
            { value: "language", label: "언어이해" },
            { value: "reasoning", label: "추리논증" },
          ]}
        />
        <CustomRadarChart
          data={
            questionType === "language"
              ? convertToRadarChartData(languageAreaScore)
              : convertToRadarChartData(reasoningAreaScore)
          }
        />
      </S.AreaRadarChartContainer>
    </S.Wrapper>
  );
}
