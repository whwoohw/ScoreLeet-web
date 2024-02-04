import * as S from "@/pages/score-insights/components/table/table.styled";

import { deleteUserAnswer } from "@/api/score-insight";
import {
  CustomDataGridToolBar,
  CustomNoRowsOverlay,
} from "@/components/score-insights-table";
import { useAuth } from "@/hooks/contextHooks";
import { UserAnswersData } from "@/types/scoreInsights";
import { analytics } from "@/utils/firebase";
import { useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumnGroupingModel,
  GridDeleteForeverIcon,
  GridRowId,
  GridSearchIcon,
  GridValueFormatterParams,
  GridValueGetterParams,
  koKR,
} from "@mui/x-data-grid";
import { logEvent } from "firebase/analytics";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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

interface ScoreInsightsTableProps {
  answersData: UserAnswersData[];
}
export default function ScoreInsightsTable({
  answersData,
}: ScoreInsightsTableProps) {
  const { currentUser } = useAuth();

  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const handleCellIconClick = useCallback(
    (id: GridRowId) => () => {
      logEvent(analytics, `score_insights_detail_button`);
      navigate(`detail?id=${id}`);
    },
    [navigate]
  );

  const handleDeleteIconClick = useCallback(
    (id: string) => () => {
      const ok = window.confirm(
        `이 채점 결과를 삭제하시겠습니까?
    삭제 후에는 복구할 수 없습니다.`
      );

      if (ok && currentUser) {
        deleteUserAnswer(id, currentUser.uid);
      }
    },
    [currentUser]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        headerName: "상세",
        headerClassName: "table-header-info",
        field: "detail-action",
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
        width: isMobile ? 60 : 100,
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        filterable: false,
        sortable: isMobile ? false : true,
      },
      {
        field: "year",
        headerName: isMobile ? "년도" : "시험년도",
        width: isMobile ? 60 : 100,
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
        width: isMobile ? 60 : 100,
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
        width: isMobile ? 60 : 100,
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
        width: isMobile ? 60 : 100,
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
        width: isMobile ? 60 : 100,
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
        field: "totalStandardScore",
        headerName: isMobile ? "표점합" : "표준점수합",
        type: "number",
        width: isMobile ? 60 : 100,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.reasoning.standardScore +
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
        field: "createdAt",
        headerName: "제출 날짜",
        type: "date",
        width: isMobile ? 80 : 120,
        valueGetter: (params: GridValueGetterParams) =>
          params.row.createdAt.toDate(),
        headerClassName: "table-header",
        headerAlign: "center",
        align: "center",
        sortable: isMobile ? false : true,
      },
      {
        headerName: "삭제",
        headerClassName: "table-header-info",
        field: "delete-action",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<GridDeleteForeverIcon />}
            label="이동하기"
            onClick={handleDeleteIconClick(params.id as string)}
          />,
        ],
      },
    ],
    [handleCellIconClick, handleDeleteIconClick, isMobile]
  );
  return (
    <S.Wrapper>
      <S.Title>전체 채점 결과</S.Title>
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
    </S.Wrapper>
  );
}
