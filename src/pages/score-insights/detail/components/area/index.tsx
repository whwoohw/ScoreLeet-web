import CustomRadioGroup from "@/components/radio-group";
import { CustomRadarChart } from "@/components/score-insights-chart";
import { ScoreInsightsAreaTable } from "@/components/score-insights-table";
import { language, reasoning } from "@/data/leetAnswers";
import {
  languageExamReports,
  reasoningExamReports,
} from "@/data/scoreInsights";
import * as S from "@/pages/score-insights/detail/components/area/area.styled";
import { QuestionTypes } from "@/types/leetAnswers";
import { ScoreInsightsData } from "@/types/scoreInsights";
import { analytics } from "@/utils/firebase";
import {
  calculateAreaScores,
  convertToRadarChartData,
} from "@/utils/scoreInsights";
import { logEvent } from "firebase/analytics";
import { useState } from "react";

interface ScoreInsightsAreaInsightsProps {
  scoreInsights: ScoreInsightsData;
}

export default function ScoreInsightsAreaInsights({
  scoreInsights,
}: ScoreInsightsAreaInsightsProps) {
  const [questionType, setQuestionType] = useState<QuestionTypes>("language");

  const languageAreaScore = calculateAreaScores({
    area: languageExamReports[scoreInsights.year].odd.area,
    answers: language[scoreInsights.year].odd,
    answerInputs:
      scoreInsights.language?.answers ??
      language[scoreInsights.year].odd.map(() => {
        return null;
      }),
  });

  const reasoningAreaScore = calculateAreaScores({
    area: reasoningExamReports[scoreInsights.year].odd.area,
    answers: reasoning[scoreInsights.year].odd,
    answerInputs:
      scoreInsights.reasoning?.answers ??
      reasoning[scoreInsights.year].odd.map(() => {
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
          changeRadio={(e) => {
            logEvent(analytics, `score_insights_area_change_button`);
            setQuestionType(e.target.value as QuestionTypes);
          }}
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
