import * as S from "@/pages/score-insights/components/chart/chart.styled";

import { CustomTooltip } from "@/components/score-insights-chart";
import { ScoreType, UserChartScores } from "@/types/scoreInsights";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  capitalizeFirstLetter,
  getMaxValueLength,
} from "@/utils/scoreInsights";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import CustomRadioGroup from "@/components/radio-group";

interface ScoreInsightsChartProps {
  chartScoresData: UserChartScores;
}

export default function ScoreInsightsChart({
  chartScoresData,
}: ScoreInsightsChartProps) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const maxLength = getMaxValueLength(chartScoresData);

  const [scoringOrder, setScoringOrder] = useState(0);
  const [scoreType, setScoreType] = useState<ScoreType>("score");

  return (
    <S.Wrapper>
      <S.Title>누적 성적 분석</S.Title>
      <S.SelectGroupContainer>
        <FormControl sx={isMobile ? { width: 90 } : { m: 1, width: 120 }}>
          <InputLabel id="select-label">시험회차</InputLabel>
          <Select
            size={isMobile ? "small" : "medium"}
            labelId="select-label"
            value={scoringOrder}
            label="시험년도"
            onChange={(e) => setScoringOrder(e.target.value as number)}
          >
            {Array.from({ length: maxLength }).map((_, index) => (
              <MenuItem value={index} key={index}>
                {index + 1}회차
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CustomRadioGroup
          title="점수 유형"
          name="scoreType"
          isRow
          radioValue={scoreType}
          changeRadio={(e) => setScoreType(e.target.value as ScoreType)}
          radioItems={[
            { value: "score", label: "원점수" },
            { value: "standardScore", label: "표준점수" },
            { value: "percentile", label: "백분위" },
          ]}
        />
      </S.SelectGroupContainer>
      <ResponsiveContainer
        style={{ border: "1px solid rgb(229 229 229)" }}
        width="100%"
        height="100%"
      >
        <LineChart
          data={Object.entries(chartScoresData).map(([year, data]) => {
            if (data.length > scoringOrder) {
              return { ...data[scoringOrder] };
            } else {
              return { year };
            }
          })}
          margin={{ top: 20, right: 35, bottom: 10, left: 5 }}
        >
          <CartesianGrid horizontal={true} vertical={false} />

          <XAxis dataKey="year" />
          <YAxis type="number" />
          <Tooltip cursor={{ fill: "#f5f6f7" }} content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ left: 40 }}
            payload={[
              { value: "언어이해", type: "square", color: "#8884d8" },
              {
                value: "추리논증",
                type: "square",
                color: "#82ca9d",
              },
            ]}
          />
          <Line
            connectNulls
            dataKey={`language${capitalizeFirstLetter(scoreType)}`}
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <Line
            connectNulls
            dataKey={`reasoning${capitalizeFirstLetter(scoreType)}`}
            stroke="#82ca9d"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </S.Wrapper>
  );
}
