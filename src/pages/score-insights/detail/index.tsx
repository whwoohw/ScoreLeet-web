import { getScoreInsights } from "@/api/score-insight";

import ScoreInsightsItem from "@/components/score-insights-item";

import { leetYearsData } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/score-insights/detail/detail.styled";
import { LeetYears } from "@/types/leetAnswers";
import { ScoreInsightsData } from "@/types/scoreInsights";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  // useMediaQuery,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { ScoreInsightsScoreTable } from "@/components/score-insights-table";
import ScoreInsightsAreaInsights from "../components/area-insights";
import ScoreInsightsQuestionInsights from "../components/question-insights";

export default function ScoreInsightsDetail() {
  const { currentUser } = useAuth();
  // const isMobile = useMediaQuery("(max-width: 600px)");

  const [isLoading, setLoading] = useState(true);

  const [scoreInsights, setScoreInsights] = useState<ScoreInsightsData>();
  const [leetYear, setLeetYear] = useState<LeetYears>("2024");

  const handleChangeYear = (event: SelectChangeEvent) => {
    setLeetYear(event.target.value as LeetYears);
  };

  useEffect(() => {
    if (currentUser) {
      getScoreInsights(currentUser, leetYear, setScoreInsights, setLoading);
    }
  }, [currentUser, leetYear]);

  return (
    <S.Wrapper>
      <S.SelectGroupContainer>
        <FormControl sx={{ m: 1, width: 120 }}>
          <InputLabel id="select-label">시험년도</InputLabel>
          <Select
            labelId="select-label"
            value={leetYear}
            label="시험년도"
            onChange={handleChangeYear}
          >
            {leetYearsData.map((leetYear) => (
              <MenuItem value={leetYear} key={leetYear}>
                {leetYear + "년"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </S.SelectGroupContainer>
      {isLoading ? (
        <CircularProgress />
      ) : (
        scoreInsights && (
          <>
            <ScoreInsightsItem title="1. 내 성적 결과">
              <ScoreInsightsScoreTable
                languageInsights={scoreInsights.language?.slice(-1)[0]}
                reasoningInsights={scoreInsights.reasoning?.slice(-1)[0]}
                languageAverage={languageScore[leetYear].averageScore}
                reasoningAverage={reasoningScore[leetYear].averageScore}
              />
              <S.ChartWarpper>
                <ResponsiveContainer
                  style={{ border: "1px solid rgb(229 229 229)" }}
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={[
                      {
                        name: "언어이해",
                        score: scoreInsights.language?.slice(-1)[0].score ?? 0,
                        averageScore: languageScore[leetYear].averageScore,
                      },
                      {
                        name: "추리논증",
                        score: scoreInsights.reasoning?.slice(-1)[0].score ?? 0,
                        averageScore: reasoningScore[leetYear].averageScore,
                      },
                    ]}
                    margin={{ top: 20, right: 35, bottom: 10, left: 5 }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} />

                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={[0, 40]} />

                    <Legend
                      wrapperStyle={{ left: 40 }}
                      payload={[
                        { value: "내 점수", type: "square", color: "#42a5f5" },
                        {
                          value: "평균 점수",
                          type: "square",
                          color: "#90a4ae",
                        },
                      ]}
                    />

                    <Bar
                      label="내 점수"
                      dataKey="score"
                      fill="#42a5f5"
                      barSize={45}
                    />
                    <Bar
                      barSize={45}
                      label="평균 점수"
                      dataKey="averageScore"
                      fill="#90a4ae"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </S.ChartWarpper>
            </ScoreInsightsItem>

            <ScoreInsightsItem title={"2. 영역별 채점 결과"}>
              <ScoreInsightsAreaInsights
                leetYear={leetYear}
                scoreInsights={scoreInsights}
              />
            </ScoreInsightsItem>

            <ScoreInsightsItem title={"3. 문항별 오답 분석"}>
              <ScoreInsightsQuestionInsights
                scoreInsights={scoreInsights}
                leetYear={leetYear}
              />
            </ScoreInsightsItem>
          </>
        )
      )}
    </S.Wrapper>
  );
}
