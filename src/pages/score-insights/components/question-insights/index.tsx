import CustomRadioGroup from "@/components/radio-group";
import * as S from "@/pages/score-insights/components/question-insights/question-insights.styled";
import { LeetYears, QuestionTypes } from "@/types/leetAnswers";
import { DataGrid, GridColDef, koKR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import {
  AnswerReports,
  QuestionArea,
  QuestionDifficulty,
  ScoreInsightsData,
} from "@/types/scoreInsights";
import { language, reasoning } from "@/data/leetAnswers";
import {
  languageExamReports,
  reasoningExamReports,
} from "@/data/scoreInsights";
import { CustomDataGridToolBar } from "@/components/score-insights-table";

const columns: GridColDef[] = [
  {
    field: "questionNumber",
    headerName: "문항",
    width: 100,
    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",

    valueFormatter: ({ value }) => `${value}번`,
  },
  {
    field: "answerInput",
    headerName: "내 답안",
    type: "number",
    width: 100,
    sortable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",
  },
  {
    field: "answer",
    headerName: "정답",
    type: "number",
    width: 100,
    sortable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",
  },
  {
    field: "isAnswer",
    type: "boolean",
    headerName: "정오",
    width: 100,
    renderCell: ({ value }) =>
      value === true ? (
        <CircleOutlinedIcon
          sx={{ width: "18px", height: "18px", color: "#1f6cd9" }}
        />
      ) : (
        <CloseIcon sx={{ width: "18px", height: "18px", color: "#ff5b5b" }} />
      ),

    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",
  },

  {
    field: "area",
    headerName: "영역",
    type: "string",
    width: 100,
    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",
  },
  {
    field: "difficulty",
    headerName: "난이도",
    type: "string",
    width: 100,
    headerAlign: "center",
    align: "center",
    headerClassName: "answer-reports-table-header",
  },
];

interface ScoreInsightsQuestionInsightsProps {
  scoreInsights: ScoreInsightsData;
  leetYear: LeetYears;
}

export default function ScoreInsightsQuestionInsights({
  scoreInsights,
  leetYear,
}: ScoreInsightsQuestionInsightsProps) {
  const [questionType, setQuestionType] = useState<QuestionTypes>("language");
  const [answerReportsData, setAnswerReportsData] = useState<AnswerReports[]>();

  useEffect(() => {
    if (scoreInsights) {
      if (questionType === "language") {
        const data = language[leetYear].odd.map((answer, index) => ({
          id: index,
          questionNumber: index + 1,
          answerInput: scoreInsights.language?.[0]?.answers?.[index] ?? "-",
          answer,
          isAnswer: answer === scoreInsights.language?.[0]?.answers?.[index],
          area:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? "-"
              : (languageExamReports[leetYear].odd.area[index] as QuestionArea),
          difficulty:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? "-"
              : (languageExamReports[leetYear].odd.difficulty[
                  index
                ] as QuestionDifficulty),
        }));
        setAnswerReportsData(data);
      } else {
        const data = reasoning[leetYear].odd.map((answer, index) => ({
          id: index,
          questionNumber: index + 1,
          answerInput: scoreInsights.reasoning?.[0]?.answers?.[index] ?? "-",
          answer,
          isAnswer: answer === scoreInsights.reasoning?.[0]?.answers?.[index],
          area:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? "-"
              : (reasoningExamReports[leetYear].odd.area[
                  index
                ] as QuestionArea),
          difficulty:
            leetYear === "2009" || leetYear === "2010" || leetYear === "2011"
              ? "-"
              : (reasoningExamReports[leetYear].odd.difficulty[
                  index
                ] as QuestionDifficulty),
        }));
        setAnswerReportsData(data);
      }
    }
  }, [scoreInsights, questionType, leetYear]);
  return (
    <S.Wrapper>
      <CustomRadioGroup
        title="시험 유형"
        isRow
        name="questionType"
        radioValue={questionType}
        changeRadio={(e) => setQuestionType(e.target.value as QuestionTypes)}
        radioItems={[
          { value: "language", label: "언어이해" },
          { value: "reasoning", label: "추리논증" },
        ]}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {answerReportsData && (
          <DataGrid
            rows={answerReportsData}
            columns={columns}
            showCellVerticalBorder
            showColumnVerticalBorder
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
            hideFooter
            // slots={{
            //   columnSortedDescendingIcon: ExpandLessIcon,
            //   columnSortedAscendingIcon: ExpandMoreIcon,
            //   columnUnsortedIcon: SortIcon,
            // }}
            slots={{
              toolbar: CustomDataGridToolBar,
            }}
            disableColumnMenu
            sx={{
              boxShadow: 2,
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .answer-reports-table-header": {
                backgroundColor: "#eeeeee",
                fontSize: "16px",
              },
            }}
          />
        )}
      </div>
    </S.Wrapper>
  );
}
