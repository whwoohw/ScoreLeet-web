import * as S from "@/pages/score-insights/cumulative/cumulative.styled";
import CustomRadioGroup from "@/components/radio-group";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CustomTooltip } from "@/components/score-insights-chart";
import ScoreInsightsItem from "@/components/score-insights-item";
import { useState } from "react";
import { ScoreInsightsData, ScoreType } from "@/types/scoreInsights";

export default function ScoreInsightsCumulative(
  scoreInsights: ScoreInsightsData
) {
  const handleChangeDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "questionType") {
      setDisplayQuestionType(event.target.value);
    } else {
      setDisplayScoreType(event.target.value as ScoreType);
    }
  };

  const [displayQuestionType, setDisplayQuestionType] = useState("all");
  const [displayScoreType, setDisplayScoreType] = useState<ScoreType>("score");
  return (
    <ScoreInsightsItem title="2. 누적 성적 확인">
      <S.SelectGroupContainer>
        <CustomRadioGroup
          title="시험 유형"
          name="questionType"
          radioValue={displayQuestionType}
          changeRadio={handleChangeDisplay}
          radioItems={[
            { value: "all", label: "전체" },
            { value: "language", label: "언어이해" },
            { value: "reasoning", label: "추리논증" },
          ]}
        />

        <CustomRadioGroup
          title="점수 유형"
          name="scoreType"
          radioValue={displayScoreType}
          changeRadio={handleChangeDisplay}
          radioItems={[
            { value: "score", label: "원점수" },
            { value: "standardScore", label: "표준점수" },
            { value: "percentile", label: "백분위점수" },
          ]}
        />
      </S.SelectGroupContainer>
      <S.ChartWarpper>
        <ResponsiveContainer
          style={{ border: "1px solid rgb(229 229 229)" }}
          width="100%"
          height="100%"
        >
          <BarChart
            width={500}
            data={Array.from({ length: 3 }, (_, index) => ({
              name: `${index + 1}회차`,
              language:
                scoreInsights.language?.[index]?.[displayScoreType] ?? 0,
              reasoning:
                scoreInsights.reasoning?.[index]?.[displayScoreType] ?? 0,
            }))}
            margin={{ top: 20, right: 35, bottom: 10, left: 5 }}
          >
            <CartesianGrid horizontal={true} vertical={false} />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: "#f5f6f7" }} content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ left: 40 }}
              payload={[
                { value: "언어이해", type: "square", color: "#0288d1" },
                {
                  value: "추리논증",
                  type: "square",
                  color: "#03a9f4",
                },
              ]}
            />
            {displayQuestionType !== "reasoning" && (
              <Bar
                stackId={"a"}
                dataKey="language"
                fill="#0288d1"
                barSize={45}
              />
            )}
            {displayQuestionType !== "language" && (
              <Bar
                stackId={"a"}
                dataKey="reasoning"
                fill="#03a9f4"
                barSize={45}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWarpper>
    </ScoreInsightsItem>
  );
}
