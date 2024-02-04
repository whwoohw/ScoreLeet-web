import * as S from "@/components/score-insights-chart/score-insights-chart.styled";
import { RadarChartData } from "@/types/scoreInsights";
import { getChartToolTipLabel } from "@/utils/scoreInsights";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

// interface ScoreInsightsChart {
//   data: { [key: string]: number | string }[];
// }

// export default function ScoreInsightsChart({ data, domain, legend }) {
//   return (
//     <ResponsiveContainer
//       style={{ border: "1px solid black" }}
//       width="100%"
//       height="100%"
//     >
//       <BarChart
//         data={[
//           {
//             name: "언어이해",
//             score: scoreInsights.language?.slice(-1)[0].score ?? 0,
//             averageScore: languageScore[leetYear].averageScore,
//           },
//           {
//             name: "추리논증",
//             score: scoreInsights.reasoning?.slice(-1)[0].score ?? 0,
//             averageScore: reasoningScore[leetYear].averageScore,
//           },
//         ]}
//         margin={{ top: 30, right: 30, bottom: 30, left: 10 }}
//       >
//         <CartesianGrid horizontal={true} vertical={false} />

//         <XAxis dataKey="name" />
//         <YAxis type="number" domain={[0, 40]} />
//         <Tooltip cursor={{ fill: "#f5f6f7" }} />
//         <Legend
//           payload={[
//             { value: "내 점수", type: "square", color: "#0288d1" },
//             {
//               value: "평균 점수",
//               type: "square",
//               color: "#03a9f4",
//             },
//           ]}
//         />

//         <Bar dataKey="score" fill="#0288d1" barSize={45} />
//         <Bar barSize={45} dataKey="averageScore" fill="#03a9f4" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <S.TooltipContainer>
        <S.TooltipLabel>{label}</S.TooltipLabel>
        <S.TooltipValue style={{ color: payload[0].color }}>
          {getChartToolTipLabel(payload[0].name?.toString())} :{" "}
          {payload[0].value}
        </S.TooltipValue>
        {payload.length > 1 && (
          <S.TooltipValue style={{ color: payload[1].color }}>
            {getChartToolTipLabel(payload[1].name?.toString())} :{" "}
            {payload[1].value}
          </S.TooltipValue>
        )}
      </S.TooltipContainer>
    );
  }

  return null;
};

export const CustomRadarChart = ({ data }: { data: RadarChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar
          name="radar"
          dataKey="value"
          stroke="#42a5f5"
          fill="#42a5f5"
          fillOpacity={0.8}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
