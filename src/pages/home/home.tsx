import * as S from "@/pages/home/home.styled";

import AnswerTable from "@/components/table/table";
import { LeetTypes, LeetYears } from "@/types/leetAnswers";
import {
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { language, reasoning } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/utils/firebase";

const leetYears = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  // "2009pre",
];

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 600px)");

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
            {leetYears.map((leetYear) => (
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
            aria-labelledby="radio-label"
            value={leetType}
            onChange={handleChangeType}
          >
            <FormControlLabel value="odd" control={<Radio />} label="홀수형" />
            <FormControlLabel value="even" control={<Radio />} label="짝수형" />
          </RadioGroup>
        </FormControl>
      </S.SelectGroupContainer>

      <Alert
        severity="info"
        sx={
          isMobile
            ? {
                width: "100%",
                height: "max-content",
                fontSize: "10.5px",
              }
            : {
                display: "flex",
                width: "max-content",
                fontSize: "14px",
              }
        }
      >
        일부 점수에 한해 표준점수와 백분위가 N/A로 나타날 수 있습니다.
      </Alert>

      <AnswerTable
        title={"언어이해"}
        answers={language[leetYear][leetType]}
        scores={languageScore[leetYear]}
        leetYear={leetYear}
        leetType={leetType}
      />

      <AnswerTable
        title={"추리논증"}
        answers={reasoning[leetYear][leetType]}
        scores={reasoningScore[leetYear]}
        leetYear={leetYear}
        leetType={leetType}
      />

      <Alert
        severity="warning"
        sx={
          isMobile
            ? {
                width: "100%",
                height: "max-content",
                fontSize: "10.5px",
              }
            : {
                display: "flex",
                width: "max-content",
                fontSize: "14px",
              }
        }
      >
        혹시 에러나 문의사항이 있으시다면, hyhan1114@snu.ac.kr 로 메일주세요!
      </Alert>
    </S.Wrapper>
  );
}
