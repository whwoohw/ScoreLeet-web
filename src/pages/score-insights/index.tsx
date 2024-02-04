import * as S from "@/pages/score-insights/score-insights.styled";

import { useAuth } from "@/hooks/contextHooks";

import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";

import { UserAnswersData, UserChartScores } from "@/types/scoreInsights";
import { getUserAnswers } from "@/api/score-insight";

import ScoreInsightsChart from "./components/chart";
import ScoreInsightsTable from "./components/table";

export default function ScoreInsights() {
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [isLoading, setLoading] = useState(true);

  const [answersData, setAnswersData] = useState<UserAnswersData[]>();

  const [chartScoresData, setChartScoresData] = useState<UserChartScores>();

  useEffect(() => {
    if (currentUser) {
      getUserAnswers(
        currentUser,
        setLoading,
        setAnswersData,
        setChartScoresData
      );
    }
  }, [currentUser]);

  return (
    <S.Wrapper>
      <Alert
        severity="info"
        sx={
          isMobile
            ? {
                marginTop: "10px",
                width: "100%",
                height: "max-content",
                fontSize: "12px",
                lineHeight: "16px",
              }
            : {
                marginTop: "30px",
                display: "flex",
                width: "max-content",
                fontSize: "16px",
                lineHeight: "26px",
              }
        }
      >
        <AlertTitle>표 사용법</AlertTitle>
        '상세' 열의 검색 버튼을 통해 세부 결과를 확인할 수 있습니다.
        <br />
        '필터' 버튼 & 각 행의 제목을 클릭하여 원하시는 스타일로 채점 결과를 확인
        가능합니다.
      </Alert>
      <S.ChartWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          chartScoresData && (
            <ScoreInsightsChart chartScoresData={chartScoresData} />
          )
        )}
      </S.ChartWrapper>

      <S.TableWrapper>
        {answersData && (
          <>
            <ScoreInsightsTable answersData={answersData} />
          </>
        )}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
