import { handleUserTestSubmission } from "@/api/user-test";
import { language, leetYearsData, reasoning } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/user-test/user-test.styled";
import { LeetYears } from "@/types/leetAnswers";
import {
  countMatchingElements,
  getScoreAdditionalInfos,
} from "@/utils/answerTable";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTest() {
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const [leetYear, setLeetYear] = useState<LeetYears>("2024");

  const languageAnswers = language[leetYear].odd;
  const languageScores = languageScore[leetYear];

  const reasoningAnswers = reasoning[leetYear].odd;
  const reasoningScores = reasoningScore[leetYear];

  const languageInputRefs = useRef(new Array(languageAnswers.length));
  const reasoningInputRefs = useRef(new Array(reasoningAnswers.length));

  const [languageAnswerInputs, setLanguageAnswerInputs] = useState<
    (number | undefined)[]
  >([]);
  const [reasoningAnswerInputs, setReasoningAnswerInputs] = useState<
    (number | undefined)[]
  >([]);

  const handleChangeYear = (event: SelectChangeEvent) => {
    setLeetYear(event.target.value as LeetYears);
  };

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = parseInt(e.target.value);
    if (e.target.name === "language") {
      if (e.target.value === "") {
        const newAnswerInputs = [...languageAnswerInputs];
        newAnswerInputs[index] = numericValue;
        setLanguageAnswerInputs(newAnswerInputs);
      } else if (numericValue >= 1 && numericValue <= 5) {
        const newAnswerInputs = [...languageAnswerInputs];
        newAnswerInputs[index] = numericValue;
        setLanguageAnswerInputs(newAnswerInputs);

        if (index === languageAnswers.length - 1) {
          languageInputRefs.current[index].blur();
        } else {
          languageInputRefs.current[index + 1].focus();
        }
      } else {
        e.preventDefault();
      }
    } else if (e.target.name === "reasoning") {
      if (e.target.value === "") {
        const newAnswerInputs = [...reasoningAnswerInputs];
        newAnswerInputs[index] = numericValue;
        setReasoningAnswerInputs(newAnswerInputs);
      } else if (numericValue >= 1 && numericValue <= 5) {
        const newAnswerInputs = [...reasoningAnswerInputs];
        newAnswerInputs[index] = numericValue;
        setReasoningAnswerInputs(newAnswerInputs);

        if (index === reasoningAnswers.length - 1) {
          reasoningInputRefs.current[index].blur();
        } else {
          reasoningInputRefs.current[index + 1].focus();
        }
      } else {
        e.preventDefault();
      }
    } else {
      return;
    }
  };

  const handleSubmit = () => {
    if (!currentUser) {
      return;
    }
    if (window.confirm("시험을 제출하시겠습니까?")) {
      const languageWithoutUndefined = languageAnswerInputs.map((item) =>
        item === undefined ? null : item
      );
      const reasoningWithoutUndefined = reasoningAnswerInputs.map((item) =>
        item === undefined ? null : item
      );

      const updatedLanguageAnswerInputs = Array.from(
        { length: languageAnswers.length },
        (_, index) => languageWithoutUndefined[index] || null
      );

      const languageScore = countMatchingElements(
        updatedLanguageAnswerInputs,
        languageAnswers
      );
      const languageStandardScore = getScoreAdditionalInfos(
        languageScores,
        languageScore,
        "standardScore"
      );
      const languagePercentile = getScoreAdditionalInfos(
        languageScores,
        languageScore,
        "percentile"
      );

      const updatedReasoningAnswerInputs = Array.from(
        { length: reasoningAnswers.length },
        (_, index) => reasoningWithoutUndefined[index] || null
      );

      const reasoningScore = countMatchingElements(
        updatedReasoningAnswerInputs,
        reasoningAnswers
      );
      const reasoningStandardScore = getScoreAdditionalInfos(
        reasoningScores,
        reasoningScore,
        "standardScore"
      );
      const reasoningPercentile = getScoreAdditionalInfos(
        reasoningScores,
        reasoningScore,
        "percentile"
      );

      handleUserTestSubmission({
        currentUser,
        leetYear,
        languageAnswerInputs,
        languageScore,
        languageStandardScore,
        languagePercentile,
        reasoningAnswerInputs,
        reasoningScore,
        reasoningStandardScore,
        reasoningPercentile,
        navigate,
      });
    }
  };

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
                fontSize: "10px",
                lineHeight: "16px",
              }
            : {
                marginTop: "30px",
                display: "flex",
                width: "max-content",
                fontSize: "14px",
                lineHeight: "26px",
              }
        }
      >
        <AlertTitle>정보</AlertTitle>
        현재 페이지에서 제출하는 채점 정보는 '내 성적분석'에서 확인할 수
        있습니다.
        <br />
        단순 채점만 원하시는 경우, 로그아웃 후 이용 가능합니다.
      </Alert>
      <S.SelectContainer>
        <FormControl sx={{ m: 1, width: "150px" }}>
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
        <Alert
          severity="warning"
          sx={
            isMobile
              ? {
                  height: "max-content",
                  fontSize: "10.5px",
                  lineHeight: "16px",
                }
              : {
                  display: "flex",
                  height: "max-content",
                  width: "max-content",
                  fontSize: "14px",
                  lineHeight: "26px",
                }
          }
        >
          성적분석은 홀수형 문제만 채점이 가능합니다!
        </Alert>
      </S.SelectContainer>

      <S.TableWrapper>
        <S.TableTitleContainer>
          <S.TableTitle>언어이해</S.TableTitle>
        </S.TableTitleContainer>

        <S.TableContainer>
          <S.TableBody>
            {language[leetYear].odd.map((_, index) => (
              <S.TableCellContainer key={index}>
                <S.TableCell>{index + 1} 번</S.TableCell>
                <S.TableInput
                  type="tel"
                  name="language"
                  ref={(input) => (languageInputRefs.current[index] = input)}
                  value={languageAnswerInputs[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e)}
                />
              </S.TableCellContainer>
            ))}
          </S.TableBody>
        </S.TableContainer>
      </S.TableWrapper>

      <S.TableWrapper>
        <S.TableTitleContainer>
          <S.TableTitle>추리논증</S.TableTitle>
        </S.TableTitleContainer>

        <S.TableContainer>
          <S.TableBody>
            {reasoning[leetYear].odd.map((_, index) => (
              <S.TableCellContainer key={index}>
                <S.TableCell>{index + 1} 번</S.TableCell>
                <S.TableInput
                  type="tel"
                  name="reasoning"
                  ref={(input) => (reasoningInputRefs.current[index] = input)}
                  value={reasoningAnswerInputs[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e)}
                />
              </S.TableCellContainer>
            ))}
          </S.TableBody>
        </S.TableContainer>
      </S.TableWrapper>

      <S.ButtonWrapper>
        <Button
          variant="contained"
          sx={
            isMobile
              ? { width: "100px", height: "32px", fontSize: "10px" }
              : { width: "150px", height: "45px" }
          }
          onClick={handleSubmit}
        >
          {"시험 제출하기"}
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
