import * as S from "@/pages/admin/admin.styled";
import {
  QuestionTypesData,
  leetTypesData,
  leetYearsData,
} from "@/data/leetAnswers";
import { useAuth } from "@/hooks/contextHooks";
import { LeetTypes, LeetYears, QuestionTypes } from "@/types/leetAnswers";
import { db } from "@/utils/firebase";
import { Timestamp, collection, getDocs, query } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { getQuestionTypeLabel } from "@/utils/functions";

interface AnswersData {
  [leetyear: string]: {
    [leetType: string]: {
      [questionType: string]: {
        id: string;
        score: number;
        answers: number[];
        createdAt: Timestamp;
      }[];
    };
  };
}

export default function AdminPage() {
  const { currentUser } = useAuth();

  const [answersData, setAnswersData] = useState<AnswersData>();

  const [leetYear, setLeetYear] = useState<LeetYears>("2024");
  const [leetType, setLeetType] = useState<LeetTypes>("odd");
  const [questionType, setQuestionType] = useState<QuestionTypes>("language");

  const handleChangeYear = (event: SelectChangeEvent) => {
    setLeetYear(event.target.value as LeetYears);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "leetType") {
      setLeetType(value as LeetTypes);
    } else if (name === "questionType") {
      setQuestionType(value as QuestionTypes);
    }
  };

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      setAnswersData((prevData) => {
        return {
          ...prevData,
          [leetYear]: {
            ...prevData?.[leetYear],
            [leetType]: {
              ...prevData?.[leetYear]?.[leetType],

              [getQuestionTypeLabel(questionType)]:
                prevData?.[leetYear]?.[leetType]?.[
                  getQuestionTypeLabel(questionType)
                ]?.filter((row) => row.id !== id) || [],
            },
          },
        };
      });
    },
    [leetYear, leetType, questionType]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 120, sortable: false },
      {
        field: "answers",
        headerName: "선택 답안",
        width: 500,
        sortable: false,
      },
      { field: "score", headerName: "원점수", type: "number", width: 100 },

      {
        field: "createdAt",
        headerName: "입력 시간",
        type: "dateTime",
        width: 200,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.createdAt.toDate(),
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
    const getAnswersData = async (
      leetYear: string,
      leetType: string,
      questionType: string
    ) => {
      const answersQuery = query(
        collection(db, "answers", leetYear + "(" + leetType + ")", questionType)
      );

      const querySnapshot = await getDocs(answersQuery);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        score: doc.data().score,
        answers: doc.data().answers,
        createdAt: doc.data().createdAt as Timestamp,
      }));

      setAnswersData((prevData) => {
        return {
          ...prevData,
          [leetYear]: {
            ...prevData?.[leetYear],
            [leetType]: {
              ...prevData?.[leetYear]?.[leetType],
              [questionType]: data,
            },
          },
        };
      });
    };

    leetYearsData.map((leetYear) => {
      leetTypesData.map((leetType) =>
        QuestionTypesData.map((questionType) => {
          getAnswersData(
            leetYear,
            leetType,
            getQuestionTypeLabel(questionType)
          );
        })
      );
    });
  }, []);

  if (!currentUser || currentUser.email !== "scoreleet@gmail.com") {
    return <Navigate to="/" />;
  }

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
        <FormControl>
          <FormLabel id="radio-label">시험 유형</FormLabel>
          <RadioGroup
            row
            name="leetType"
            aria-labelledby="radio-label"
            value={leetType}
            onChange={handleChangeType}
          >
            <FormControlLabel value="odd" control={<Radio />} label="홀수형" />
            <FormControlLabel value="even" control={<Radio />} label="짝수형" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="radio-label">문제 유형</FormLabel>
          <RadioGroup
            row
            name="questionType"
            aria-labelledby="radio-label"
            value={questionType}
            onChange={handleChangeType}
          >
            <FormControlLabel
              value="language"
              control={<Radio />}
              label="언어이해"
            />
            <FormControlLabel
              value="reasoning"
              control={<Radio />}
              label="추리논증"
            />
          </RadioGroup>
        </FormControl>
      </S.SelectGroupContainer>
      <S.TableWrapper>
        {answersData && (
          <DataGrid
            rows={
              answersData[leetYear][leetType][
                getQuestionTypeLabel(questionType)
              ]
            }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            // checkboxSelection
          />
        )}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
