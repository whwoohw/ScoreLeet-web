import * as S from "@/pages/score-insights/score-insight.styled";

import { useAuth } from "@/hooks/contextHooks";
import { LeetYears } from "@/types/leetAnswers";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumnGroupingModel,
  GridRowId,
  GridSearchIcon,
  GridValueFormatterParams,
  GridValueGetterParams,
  koKR,
} from "@mui/x-data-grid";
import { leetYearsData } from "@/data/leetAnswers";
import { UserAnswersData } from "@/types/scoreInsights";
import { getUserAnswers } from "@/api/score-insight";
import { useNavigate } from "react-router-dom";
import { CustomDataGridToolBar } from "@/components/score-insights-table";

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "language",
    headerName: "언어이해",
    headerAlign: "center",
    headerClassName: "table-group-header",

    children: [{ field: "languageScore" }, { field: "languageStandardScore" }],
  },
  {
    groupId: "reasoning",
    headerName: "추리논증",
    headerAlign: "center",
    headerClassName: "table-group-header",

    children: [
      { field: "reasoningScore" },
      { field: "reasoningStandardScore" },
    ],
  },
];

export default function ScoreInsights() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const [answersData, setAnswersData] = useState<UserAnswersData[]>();
  const [leetYear, setLeetYear] = useState<LeetYears>("2024");

  const handleChangeYear = (event: SelectChangeEvent) => {
    setLeetYear(event.target.value as LeetYears);
  };

  const handleCellIconClick = useCallback(
    (id: GridRowId, year: LeetYears) => () => {
      navigate(`detail?id=${id}&year=${year}`);
    },
    [navigate]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "index",
        headerName: "번호",
        type: "number",
        width: 100,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "year",
        headerName: "시험년도",
        width: 100,
        valueFormatter: (params: GridValueFormatterParams<string>) => {
          return `${params.value}년`;
        },
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "languageScore",
        headerName: "원점수",
        type: "number",
        width: 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.language.score,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "languageStandardScore",
        headerName: "표준점수",
        type: "number",
        width: 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.language.standardScore,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value === 0) {
            return "N/A";
          }
          return params.value;
        },
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "reasoningScore",
        headerName: "원점수",
        type: "number",
        width: 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.reasoning.score,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "reasoningStandardScore",
        headerName: "표준점수",
        type: "number",
        width: 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.reasoning.standardScore,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          if (params.value === 0) {
            return "N/A";
          }
          return params.value;
        },
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "createdAt",
        headerName: "제출 시간",
        type: "dateTime",
        width: 200,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.createdAt.toDate(),
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        type: "actions",
        width: 30,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridSearchIcon />}
            label="이동하기"
            onClick={handleCellIconClick(params.id, params.row.year)}
          />,
        ],
      },
    ],
    [handleCellIconClick]
  );

  useEffect(() => {
    if (currentUser) {
      getUserAnswers(currentUser, leetYear, setLoading, setAnswersData);
    }
  }, [leetYear, currentUser]);

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
      <S.TableWrapper>
        {isLoading ? (
          <CircularProgress />
        ) : (
          answersData && (
            <DataGrid
              hideFooter
              rows={answersData}
              columns={columns}
              experimentalFeatures={{ columnGrouping: true }}
              columnGroupingModel={columnGroupingModel}
              localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
              disableColumnMenu
              // disableColumnFilter
              showColumnVerticalBorder
              slots={{
                toolbar: CustomDataGridToolBar,
              }}
              showCellVerticalBorder
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .table-header": {
                  backgroundColor: "#eeeeee",
                  fontSize: "16px",
                },
                "& .table-group-header": {
                  fontSize: "20px",
                },
              }}
            />
          )
        )}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
