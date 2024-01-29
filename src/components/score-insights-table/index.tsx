import * as S from "@/components/score-insights-table/score-insights-table.styled";
import { ScoreInsights } from "@/types/scoreInsights";

interface ScoreInsightsTableProps {
  language: ScoreInsights | undefined;
  reasoning: ScoreInsights | undefined;
  languageAverage: number;
  reasoningAverage: number;
}

export default function ScoreInsightsTable({
  language,
  reasoning,
  languageAverage,
  reasoningAverage,
}: ScoreInsightsTableProps) {
  return (
    <S.Wrapper>
      <S.ScoreTableItemHead></S.ScoreTableItemHead>
      <S.ScoreTableItemHead>원점수</S.ScoreTableItemHead>
      <S.ScoreTableItemHead>표준점수</S.ScoreTableItemHead>
      <S.ScoreTableItemHead>백분위점수</S.ScoreTableItemHead>
      <S.ScoreTableItemHead
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        원점수 평균
      </S.ScoreTableItemHead>

      <S.ScoreTableItemHead>언어이해</S.ScoreTableItemHead>
      <S.ScoreTableItemBody>
        {language == undefined || language?.score === 0
          ? "-"
          : language.score + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {language == undefined || language?.standardScore === 0
          ? "-"
          : language.standardScore + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {language == undefined || language?.percentile === 0
          ? "-"
          : language.percentile + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {languageAverage}점
      </S.ScoreTableItemBody>

      <S.ScoreTableItemHead>추리논증</S.ScoreTableItemHead>
      <S.ScoreTableItemBody>
        {reasoning == undefined || reasoning?.score === 0
          ? "-"
          : reasoning.score + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {reasoning == undefined || reasoning?.standardScore === 0
          ? "-"
          : reasoning.standardScore + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {reasoning == undefined || reasoning?.percentile === 0
          ? "-"
          : reasoning.percentile + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {reasoningAverage}점
      </S.ScoreTableItemBody>

      <S.ScoreTableItemHead>합계</S.ScoreTableItemHead>
      <S.ScoreTableItemBody>
        {language == undefined ||
        language?.score === 0 ||
        reasoning == undefined ||
        reasoning?.score === 0
          ? "-"
          : language.score + reasoning.score + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {language == undefined ||
        language?.standardScore === 0 ||
        reasoning == undefined ||
        reasoning?.standardScore === 0
          ? "-"
          : language.standardScore + reasoning.standardScore + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody>
        {language == undefined ||
        language?.percentile === 0 ||
        reasoning == undefined ||
        reasoning?.percentile === 0
          ? "-"
          : language.percentile + reasoning.percentile + "점"}
      </S.ScoreTableItemBody>
      <S.ScoreTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {languageAverage + reasoningAverage}점
      </S.ScoreTableItemBody>
    </S.Wrapper>
  );
}
