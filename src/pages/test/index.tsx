import { handleUserTestSubmission } from "@/api/test";
import { language, leetYearsData, reasoning } from "@/data/leetAnswers";
import { languageScore, reasoningScore } from "@/data/leetScores";
import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/test/test.styled";
import { LeetYears } from "@/types/leetAnswers";
import {
  countMatchingElements,
  getScoreAdditionalInfos,
} from "@/utils/answerTable";
import {
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

export default function Test() {
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
  };

  return (
    <S.Wrapper>
      <FormControl sx={{ m: 1, width: 200 }}>
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

      <Button
        variant="contained"
        sx={
          isMobile
            ? { width: "90px", height: "32px", fontSize: "10px" }
            : { width: "120px", height: "45px" }
        }
        onClick={handleSubmit}
      >
        {"시험 제출하기"}
      </Button>
    </S.Wrapper>
  );
}
