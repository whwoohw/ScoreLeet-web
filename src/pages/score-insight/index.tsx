import { getScoreInsights } from "@/api/score-insight";
import CustomRadioGroup from "@/components/radio-group";
import { CustomTooltip } from "@/components/score-insights-chart";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import ScoreInsightsItem from "@/components/score-insights-item";
import ScoreInsightsTable from "@/components/score-insights-table";
import { language, leetYearsData, reasoning } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/score-insight/score-insight.styled";
import { LeetYears, QuestionTypes } from "@/types/leetAnswers";
import {
  AnswerReports,
  QuestionArea,
  QuestionDifficulty,
  ScoreInsightsData,
} from "@/types/scoreInsights";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  // useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowId,
  koKR,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  languageExamReports,
  reasoningExamReports,
} from "@/data/scoreInsights";

type ScoreType = "score" | "standardScore" | "percentile";

export default function ScoreInsight() {
  const { currentUser } = useAuth();
  // const isMobile = useMediaQuery("(max-width: 600px)");

  const [isLoading, setLoading] = useState(true);

  const [scoreInsights, setScoreInsights] = useState<ScoreInsightsData>();
  const [leetYear, setLeetYear] = useState<LeetYears>("2024");

  const [displayQuestionType, setDisplayQuestionType] = useState("all");
  const [displayScoreType, setDisplayScoreType] = useState<ScoreType>("score");

  const [answerReportsData, setAnswerReportsData] = useState<AnswerReports[]>();
  const [answerReportsQuestionType, setAnswerReportsQuestionType] = useState<
    "language" | "reasoning"
  >("language");
  const [answerReportsNumber, setAnswerReportsNumber] = useState<number>(1);

  const handleChangeYear = (event: SelectChangeEvent) => {
    setLeetYear(event.target.value as LeetYears);
  };

  const handleChangeDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "questionType") {
      setDisplayQuestionType(event.target.value);
    } else {
      setDisplayScoreType(event.target.value as ScoreType);
    }
  };

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      setAnswerReportsData((prevData) =>
        prevData?.filter((row) => row.id !== id)
      );
    },
    []
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "questionNumber", headerName: "문항", width: 100 },
      {
        field: "answerInput",
        headerName: "내 답안",
        type: "number",
        width: 100,
        sortable: false,
      },
      {
        field: "answer",
        headerName: "정답",
        type: "number",
        width: 100,
        sortable: false,
      },
      {
        field: "isAnswer",
        type: "boolean",
        headerName: "정오",
        width: 100,
        sortable: false,
      },

      {
        field: "area",
        headerName: "영역",
        type: "string",
        width: 150,
      },
      {
        field: "difficulty",
        headerName: "난이도",
        type: "string",
        width: 100,
      },
      {
        field: "actions",
        type: "actions",
        width: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.id)}
          />,
        ],
      },
    ],
    [handleDeleteClick]
  );

  useEffect(() => {
    if (currentUser) {
      getScoreInsights(currentUser, leetYear, setScoreInsights, setLoading);
    }
  }, [currentUser, leetYear]);

  useEffect(() => {
    if (scoreInsights && answerReportsNumber) {
      if (answerReportsQuestionType === "language") {
        const data = language[leetYear].odd.map((answer, index) => ({
          id: index,
          questionNumber: index + 1,
          answerInput:
            scoreInsights.language[answerReportsNumber - 1].answers?.[index] ??
            null,
          answer,
          isAnswer:
            answer ===
            scoreInsights.language[answerReportsNumber - 1].answers?.[index],
          area:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? null
              : (languageExamReports[leetYear].odd.area[index] as QuestionArea),
          difficulty:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? null
              : (languageExamReports[leetYear].odd.difficulty[
                  index
                ] as QuestionDifficulty),
        }));
        setAnswerReportsData(data);
      } else {
        const data = reasoning[leetYear].odd.map((answer, index) => ({
          id: index,
          questionNumber: index + 1,
          answerInput:
            scoreInsights.reasoning[answerReportsNumber - 1].answers?.[index] ??
            null,
          answer,
          isAnswer:
            answer ===
            scoreInsights.reasoning[answerReportsNumber - 1].answers?.[index],
          area:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? null
              : (reasoningExamReports[leetYear].odd.area[
                  index
                ] as QuestionArea),
          difficulty:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? null
              : (reasoningExamReports[leetYear].odd.difficulty[
                  index
                ] as QuestionDifficulty),
        }));
        setAnswerReportsData(data);
      }
    }
  }, [scoreInsights, answerReportsNumber, answerReportsQuestionType, leetYear]);

  console.log(
    scoreInsights,
    answerReportsData,
    answerReportsNumber,
    answerReportsQuestionType,
    leetYear
  );

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
              <ScoreInsightsTable
                language={scoreInsights.language?.slice(-1)[0]}
                reasoning={scoreInsights.reasoning?.slice(-1)[0]}
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
                        scoreInsights.language?.[index]?.[displayScoreType] ??
                        0,
                      reasoning:
                        scoreInsights.reasoning?.[index]?.[displayScoreType] ??
                        0,
                    }))}
                    margin={{ top: 20, right: 35, bottom: 10, left: 5 }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} />

                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "#f5f6f7" }}
                      content={<CustomTooltip />}
                    />
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

            <ScoreInsightsItem title={"3. 문항별 오답 분석"}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CustomRadioGroup
                  title="시험 유형"
                  isRow
                  radioValue={answerReportsQuestionType}
                  changeRadio={(event) =>
                    setAnswerReportsQuestionType(
                      event.target.value as QuestionTypes
                    )
                  }
                  radioItems={[
                    { value: "language", label: "언어이해" },
                    { value: "reasoning", label: "추리논증" },
                  ]}
                />

                <CustomRadioGroup
                  title="시험 유형"
                  isRow
                  radioValue={answerReportsNumber}
                  changeRadio={(event) =>
                    setAnswerReportsNumber(event.target.value)
                  }
                  radioItems={[
                    { value: 1, label: "1회차" },
                    { value: 2, label: "2회차" },
                    { value: 3, label: "3회차" },
                  ]}
                />

                {answerReportsData && (
                  <DataGrid
                    rows={answerReportsData}
                    columns={columns}
                    showCellVerticalBorder={true}
                    showColumnVerticalBorder={true}
                    localeText={
                      koKR.components.MuiDataGrid.defaultProps.localeText
                    }
                  />
                )}
              </div>
            </ScoreInsightsItem>
          </>
        )
      )}
    </S.Wrapper>
  );
}
