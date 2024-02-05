import { getScoreInsight } from "@/api/score-insight";

import ScoreInsightsItem from "@/components/score-insights-item";

import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/score-insights/detail/detail.styled";

import { ScoreInsightsData } from "@/types/scoreInsights";
import { CircularProgress } from "@mui/material";

import { useEffect, useState } from "react";

import ScoreInsightsAreaInsights from "./components/area";
import ScoreInsightsQuestionInsights from "./components/question";
import { useSearchParams } from "react-router-dom";
import ScoreInsightsScore from "./components/score";

export default function ScoreInsightsDetail() {
  const { currentUser } = useAuth();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [isLoading, setLoading] = useState(true);

  const [scoreInsights, setScoreInsights] = useState<ScoreInsightsData>();

  useEffect(() => {
    if (currentUser && id) {
      getScoreInsight(currentUser, id, setScoreInsights, setLoading);
    }
  }, [currentUser, id]);

  return (
    <S.Wrapper>
      {isLoading ? (
        <CircularProgress />
      ) : scoreInsights && scoreInsights.year && id ? (
        <>
          <ScoreInsightsItem title="1. 내 성적 결과">
            <ScoreInsightsScore scoreInsights={scoreInsights} />
          </ScoreInsightsItem>

          <ScoreInsightsItem title={"2. 영역별 채점 결과"}>
            <ScoreInsightsAreaInsights scoreInsights={scoreInsights} />
          </ScoreInsightsItem>

          <ScoreInsightsItem title={"3. 문항별 오답 분석"}>
            <ScoreInsightsQuestionInsights scoreInsights={scoreInsights} />
          </ScoreInsightsItem>
        </>
      ) : (
        <h3>존재하지 않는 결과입니다.</h3>
      )}
    </S.Wrapper>
  );
}
