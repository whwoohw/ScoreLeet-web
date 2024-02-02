import * as S from "@/components/score-insights-table/score-insights-table.styled";

import { ScoreInsights, ScoreInsightsAreaData } from "@/types/scoreInsights";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

interface ScoreInsightsScoreTableProps {
  languageInsights: ScoreInsights | undefined;
  reasoningInsights: ScoreInsights | undefined;
  languageAverage: number;
  reasoningAverage: number;
}

export function ScoreInsightsScoreTable({
  languageInsights,
  reasoningInsights,
  languageAverage,
  reasoningAverage,
}: ScoreInsightsScoreTableProps) {
  return (
    <S.ScoreInsightsTableWrapper content={5} height={200}>
      <S.ScoreInsightsTableItemHead></S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemHead>원점수</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemHead>표준점수</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemHead>백분위점수</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemHead
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        원점수 평균
      </S.ScoreInsightsTableItemHead>

      <S.ScoreInsightsTableItemHead>언어이해</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined || languageInsights?.score === 0
          ? "-"
          : languageInsights.score + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined || languageInsights?.standardScore === 0
          ? "-"
          : languageInsights.standardScore + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined || languageInsights?.percentile === 0
          ? "-"
          : languageInsights.percentile + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {languageAverage}점
      </S.ScoreInsightsTableItemBody>

      <S.ScoreInsightsTableItemHead>추리논증</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemBody>
        {reasoningInsights == undefined || reasoningInsights?.score === 0
          ? "-"
          : reasoningInsights.score + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {reasoningInsights == undefined ||
        reasoningInsights?.standardScore === 0
          ? "-"
          : reasoningInsights.standardScore + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {reasoningInsights == undefined || reasoningInsights?.percentile === 0
          ? "-"
          : reasoningInsights.percentile + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {reasoningAverage}점
      </S.ScoreInsightsTableItemBody>

      <S.ScoreInsightsTableItemHead>합계</S.ScoreInsightsTableItemHead>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined ||
        languageInsights?.score === 0 ||
        reasoningInsights == undefined ||
        reasoningInsights?.score === 0
          ? "-"
          : languageInsights.score + reasoningInsights.score + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined ||
        languageInsights?.standardScore === 0 ||
        reasoningInsights == undefined ||
        reasoningInsights?.standardScore === 0
          ? "-"
          : (
              languageInsights.standardScore + reasoningInsights.standardScore
            ).toFixed(1) + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody>
        {languageInsights == undefined ||
        languageInsights?.percentile === 0 ||
        reasoningInsights == undefined ||
        reasoningInsights?.percentile === 0
          ? "-"
          : (
              languageInsights.percentile + reasoningInsights.percentile
            ).toFixed(1) + "점"}
      </S.ScoreInsightsTableItemBody>
      <S.ScoreInsightsTableItemBody
        style={{ backgroundColor: "#eeeeee", fontStyle: "italic" }}
      >
        {(languageAverage + reasoningAverage).toFixed(2)}점
      </S.ScoreInsightsTableItemBody>
    </S.ScoreInsightsTableWrapper>
  );
}

interface ScoreInsightsAreaTableProps {
  title: string;
  areaScore: ScoreInsightsAreaData;
}
export function ScoreInsightsAreaTable({
  title,
  areaScore,
}: ScoreInsightsAreaTableProps) {
  return (
    <S.AreaTableContainer>
      <S.AreaTableTitle>{title}</S.AreaTableTitle>
      {areaScore && (
        <S.ScoreInsightsTableWrapper
          content={Object.keys(areaScore).length + 1}
          height={120}
        >
          <S.ScoreInsightsTableItemHead></S.ScoreInsightsTableItemHead>
          {Object.keys(areaScore).map((area) => (
            <S.ScoreInsightsTableItemHead key={area}>
              {area}
            </S.ScoreInsightsTableItemHead>
          ))}
          <S.ScoreInsightsTableItemHead
            style={{
              height: "70px",
            }}
          >
            정답률
          </S.ScoreInsightsTableItemHead>
          {Object.entries(areaScore).map(([area, scores]) => (
            <S.ScoreInsightsTableItemBody
              key={area}
              style={{
                height: "70px",
              }}
            >
              <p
                style={{
                  wordSpacing: "1px",
                  fontSize: "15px",
                  lineHeight: "20px",
                }}
              >
                <sup style={{ color: "#577dd0" }}>{scores.score}</sup> /{" "}
                <sub>{scores.total}</sub>
              </p>

              <p style={{ color: "#888888" }}>
                {"(" + ((scores.score / scores.total) * 100).toFixed(1) + "%)"}
              </p>
            </S.ScoreInsightsTableItemBody>
          ))}
        </S.ScoreInsightsTableWrapper>
      )}
    </S.AreaTableContainer>
  );
}

export const CustomDataGridToolBar = () => {
  return (
    <GridToolbarContainer sx={{ width: "120px", height: "50px" }}>
      <GridToolbarFilterButton sx={{ width: "100%", height: "100%" }} />
    </GridToolbarContainer>
  );
};

export const CustomNoRowsOverlay = () => {
  return <h3>제출한 시험 결과가 없습니다.</h3>;
};
