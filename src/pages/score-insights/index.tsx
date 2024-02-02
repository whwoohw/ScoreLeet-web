import * as S from "@/pages/score-insights/score-insights.styled";

import { useAuth } from "@/hooks/contextHooks";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  useMediaQuery,
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
import { UserAnswersData } from "@/types/scoreInsights";
import { getUserAnswers } from "@/api/score-insight";
import { useNavigate } from "react-router-dom";
import {
  CustomDataGridToolBar,
  CustomNoRowsOverlay,
} from "@/components/score-insights-table";

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
  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const [answersData, setAnswersData] = useState<UserAnswersData[]>();

  const handleCellIconClick = useCallback(
    (id: GridRowId) => () => {
      navigate(`detail?id=${id}`);
    },
    [navigate]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        headerName: "상세",
        headerClassName: "table-header-info",
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridSearchIcon />}
            label="이동하기"
            onClick={handleCellIconClick(params.id)}
          />,
        ],
      },
      {
        field: "index",
        headerName: "번호",
        type: "number",
        width: isMobile ? 50 : 100,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "year",
        headerName: isMobile ? "년도" : "시험년도",
        width: isMobile ? 50 : 100,
        valueFormatter: (params: GridValueFormatterParams<string>) => {
          return `${params.value}년`;
        },
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        sortable: isMobile ? false : true,
      },
      {
        field: "languageScore",
        headerName: isMobile ? "점수" : "원점수",
        type: "number",
        width: isMobile ? 50 : 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.language.score,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "languageStandardScore",
        headerName: isMobile ? "표점" : "표준점수",
        type: "number",
        width: isMobile ? 50 : 100,
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
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "reasoningScore",
        headerName: isMobile ? "점수" : "원점수",
        type: "number",
        width: isMobile ? 50 : 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.reasoning.score,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "reasoningStandardScore",
        headerName: isMobile ? "표점" : "표준점수",
        type: "number",
        width: isMobile ? 50 : 100,
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
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "createdAt",
        headerName: "제출 시간",
        type: "dateTime",
        width: isMobile ? 150 : 200,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.createdAt.toDate(),
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        sortable: isMobile ? false : true,
      },
    ],
    [handleCellIconClick, isMobile]
  );

  useEffect(() => {
    if (currentUser) {
      getUserAnswers(currentUser, setLoading, setAnswersData);
    }
  }, [currentUser]);

  return (
    <S.Wrapper>
      <Alert
        severity="info"
        sx={
          isMobile
            ? {
                marginTop: "10px",
                width: "100%",
                height: "max-content",
                fontSize: "12px",
                lineHeight: "16px",
              }
            : {
                marginTop: "30px",
                display: "flex",
                width: "max-content",
                fontSize: "16px",
                lineHeight: "26px",
              }
        }
      >
        <AlertTitle>정보</AlertTitle>
        '상세' 열의 검색 버튼을 통해 세부 결과를 확인할 수 있습니다.
        <br />
        '필터' 버튼 & 각 행의 제목을 클릭하여 원하시는 스타일로 채점 결과를 확인
        가능합니다.
      </Alert>
      `
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
              initialState={{
                sorting: {
                  sortModel: [{ field: "createdAt", sort: "asc" }],
                },
              }}
              slots={{
                toolbar: CustomDataGridToolBar,
                noRowsOverlay: CustomNoRowsOverlay,
              }}
              showCellVerticalBorder
              sx={{
                boxShadow: 2,
                "& .MuiDataGrid-cell": {
                  fontSize: isMobile ? "10px" : "14px",
                },
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .table-header": {
                  backgroundColor: "#eeeeee",
                  borderTop: "1px solid rgba(224, 224, 224, 1)",
                  fontSize: isMobile ? "12px" : "16px",
                },
                "& .table-group-header": {
                  fontSize: isMobile ? "14px" : "20px",
                  borderBottom: "1px solid white",
                  borderTop: "1px solid rgba(224, 224, 224, 1)",
                },
                "& .table-header-info": {
                  backgroundColor: "#ffffff",
                  borderTop: "1px solid rgba(224, 224, 224, 1)",
                  fontSize: isMobile ? "12px" : "16px",
                },
              }}
            />
          )
        )}
      </S.TableWrapper>
    </S.Wrapper>
  );
}
