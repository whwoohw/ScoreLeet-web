import { ScoreInsightsScoreTable } from "@/components/score-insights-table";
import { languageScore, reasoningScore } from "@/data/leetScores";
import * as S from "@/pages/score-insights/detail/components/score/score.styled";
import { ScoreInsightsData } from "@/types/scoreInsights";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ScoreInsightsScoreProps {
  scoreInsights: ScoreInsightsData;
}

export default function ScoreInsightsScore({
  scoreInsights,
}: ScoreInsightsScoreProps) {
  return (
    <S.Wrapper>
      <ScoreInsightsScoreTable
        languageInsights={scoreInsights.language}
        reasoningInsights={scoreInsights.reasoning}
        languageAverage={languageScore[scoreInsights.year].averageScore}
        reasoningAverage={reasoningScore[scoreInsights.year].averageScore}
      />
      <S.ChartWrapper>
        <ResponsiveContainer
          style={{ border: "1px solid rgb(229 229 229)" }}
          width="100%"
          height="100%"
        >
          <BarChart
            data={[
              {
                name: "언어이해",
                score: scoreInsights.language.score ?? 0,
                averageScore: languageScore[scoreInsights.year].averageScore,
              },
              {
                name: "추리논증",
                score: scoreInsights.reasoning.score ?? 0,
                averageScore: reasoningScore[scoreInsights.year].averageScore,
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

            <Bar label="내 점수" dataKey="score" fill="#42a5f5" barSize={45} />
            <Bar
              barSize={45}
              label="평균 점수"
              dataKey="averageScore"
              fill="#90a4ae"
            />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Wrapper>
  );
}
