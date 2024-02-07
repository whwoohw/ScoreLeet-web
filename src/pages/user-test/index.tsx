import { handleUserTestSubmission } from "@/api/user-test";
import { language, leetYearsData, reasoning } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/user-test/user-test.styled";
import { LeetYears } from "@/types/leetAnswers";
import { UserTestScore } from "@/types/scoreInsights";
import {
  countMatchingElements,
  getScoreAdditionalInfos,
} from "@/utils/answerTable";
import { analytics } from "@/utils/firebase";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  useMediaQuery,
} from "@mui/material";
import { logEvent } from "firebase/analytics";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTest() {
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const [leetYear, setLeetYear] = useState<LeetYears>("2024");
  const [isSwitchChecked, setSwitchChecked] = useState(false);
  const [scores, setScores] = useState<UserTestScore>();

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

  const handleSubmitAnswers = () => {
    logEvent(analytics, `user_tests_submit_answer_button`);
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

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScores({ ...(scores as UserTestScore), [name]: parseInt(value) });
  };

  const handleSubmitScore = () => {
    logEvent(analytics, `user_tests_submit_score_button`);
    if (!currentUser) {
      return;
    }
    if (!scores || scores.language > 35 || scores.reasoning > 40) {
      return alert("점수를 정확히 입력해주세요!");
    }

    if (window.confirm("점수를 제출하시겠습니까?")) {
      const languageStandardScore = getScoreAdditionalInfos(
        languageScores,
        scores.language,
        "standardScore"
      );
      const languagePercentile = getScoreAdditionalInfos(
        languageScores,
        scores.language,
        "percentile"
      );

      const reasoningStandardScore = getScoreAdditionalInfos(
        reasoningScores,
        scores.reasoning,
        "standardScore"
      );
      const reasoningPercentile = getScoreAdditionalInfos(
        reasoningScores,
        scores.reasoning,
        "percentile"
      );

      handleUserTestSubmission({
        currentUser,
        leetYear,
        languageAnswerInputs: [],
        languageScore: scores.language,
        languageStandardScore,
        languagePercentile,
        reasoningAnswerInputs: [],
        reasoningScore: scores.reasoning,
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
          <AlertTitle>주의</AlertTitle>
          성적분석은 홀수형 문제만 채점이 가능합니다. <br />
          성적만 입력하기를 통해 제출시, 문항별 분석은 불가능합니다.
        </Alert>
      </S.SelectContainer>

      <FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isSwitchChecked}
              onChange={() => setSwitchChecked((prev) => !prev)}
            />
          }
          label="원점수만 입력하기"
        />
      </FormControl>

      {isSwitchChecked && (
        <S.ScoreInputFormContainer>
          <S.InputContainer>
            <S.InputWrapper>
              <S.InputTitle>언어이해 : </S.InputTitle>
              <FormControl
                sx={isMobile ? { width: "100px" } : { width: "120px" }}
                variant="outlined"
              >
                <OutlinedInput
                  size="small"
                  name="language"
                  value={scores?.language}
                  onChange={handleChangeScore}
                  endAdornment={
                    <InputAdornment position="end">점</InputAdornment>
                  }
                />
              </FormControl>
            </S.InputWrapper>

            <S.InputWrapper>
              <S.InputTitle>추리논증 : </S.InputTitle>
              <FormControl
                sx={isMobile ? { width: "100px" } : { width: "120px" }}
                variant="outlined"
              >
                <OutlinedInput
                  name="reasoning"
                  size="small"
                  value={scores?.reasoning}
                  onChange={handleChangeScore}
                  endAdornment={
                    <InputAdornment position="end">점</InputAdornment>
                  }
                />
              </FormControl>
            </S.InputWrapper>
          </S.InputContainer>
          <S.ButtonWrapper>
            <Button
              variant="contained"
              sx={
                isMobile
                  ? { width: "90px", height: "28px", fontSize: "10px" }
                  : { width: "120px", height: "40px" }
              }
              onClick={handleSubmitScore}
            >
              점수 제출하기
            </Button>
          </S.ButtonWrapper>
        </S.ScoreInputFormContainer>
      )}

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
          onClick={handleSubmitAnswers}
        >
          {"시험 제출하기"}
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
