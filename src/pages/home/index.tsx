import * as S from "@/pages/home/home.styled";

import AnswerTable from "@/components/answer-table/answer-table";
import { LeetTypes, LeetYears } from "@/types/leetAnswers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Alert,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

import { logEvent } from "firebase/analytics";
import { analytics } from "@/utils/firebase";
import { leetYearsData } from "@/data/leetAnswers";
import CustomRadioGroup from "@/components/radio-group";
import { useAuth } from "@/hooks/contextHooks";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [leetYear, setLeetYear] = useState<LeetYears>("2024");
  const [leetType, setLeetType] = useState<LeetTypes>("odd");

  const handleChangeYear = (event: SelectChangeEvent) => {
    logEvent(analytics, `change_year`);
    setLeetYear(event.target.value as LeetYears);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    logEvent(analytics, `change_type`);
    setLeetType(event.target.value as LeetTypes);
  };

  const handleClickFab = () => {
    logEvent(analytics, `check_example_button`);
    navigate("/score-insights/example");
  };

  if (currentUser) {
    return <Navigate to={"/user-test"} />;
  }

  return (
    <S.Wrapper>
      <S.AlertWrapper>
        <Alert
          severity="info"
          sx={
            isMobile
              ? {
                  display: "flex",
                  width: "100%",
                  height: "40px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  lineHeight: "18px",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  display: "flex",
                  width: "300px",
                  height: "60px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          성적분석 업데이트 했습니다
        </Alert>

        <Fab
          sx={
            isMobile
              ? { zIndex: 1, width: "140px", fontSize: "9px" }
              : { zIndex: 1, width: "140px" }
          }
          variant="extended"
          size={isMobile ? "small" : "medium"}
          color="primary"
          onClick={handleClickFab}
        >
          <ArrowBackIcon
            sx={isMobile ? { mr: 1, fontSize: "9px" } : { mr: 1 }}
          />
          확인하러가기
        </Fab>
      </S.AlertWrapper>
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

        <CustomRadioGroup
          title="시험 유형"
          isRow
          radioValue={leetType}
          changeRadio={handleChangeType}
          radioItems={[
            { value: "odd", label: "홀수형" },
            { value: "even", label: "짝수형" },
          ]}
        />
      </S.SelectGroupContainer>

      <AnswerTable title={"언어이해"} leetYear={leetYear} leetType={leetType} />

      <AnswerTable title={"추리논증"} leetYear={leetYear} leetType={leetType} />
    </S.Wrapper>
  );
}
