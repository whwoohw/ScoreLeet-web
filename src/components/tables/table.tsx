import * as S from "@/components/tables/table.styles";
import { Button, useMediaQuery } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { LeetScores } from "@/types/leetScores";

interface TableProps {
  title: string;
  answers: number[];
  scores: LeetScores;
}

const countMatchingElements = (
  answerInputs: (number | undefined)[],
  answers: number[]
) => {
  let count = 0;

  answerInputs.forEach((element, index) => {
    if (element === answers[index]) {
      count++;
    }
  });

  return count;
};

export default function AnswerTable({ title, answers, scores }: TableProps) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const inputRefs = useRef(new Array(answers.length));

  const [answerInputs, setAnswerInputs] = useState<(number | undefined)[]>([]);
  const [score, setScore] = useState(0);
  const [isSubmit, setSubmit] = useState(false);
  const [isAnswerShowed, setAnswerShowed] = useState(false);

  const handleAnswerChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = parseInt(e.target.value);

    if (e.target.value === "") {
      const newAnswerInputs = [...answerInputs];
      newAnswerInputs[index] = numericValue;
      setAnswerInputs(newAnswerInputs);
    } else if (numericValue >= 1 && numericValue <= 5) {
      const newAnswerInputs = [...answerInputs];
      newAnswerInputs[index] = numericValue;
      setAnswerInputs(newAnswerInputs);

      if (index === answers.length - 1) {
        inputRefs.current[index].blur();
      } else {
        inputRefs.current[index + 1].focus();
      }
    } else {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    if (!isSubmit) {
      const indexOfUndefined = answerInputs.indexOf(undefined);
      if (indexOfUndefined !== -1 || answerInputs.length !== answers.length) {
        if (
          window.confirm(
            `입력되지 않은 답안이 있습니다. 그래도 채점하시겠습니까?`
          )
        ) {
          setSubmit(true);
          setScore(countMatchingElements(answerInputs, answers));
        }
      } else {
        setSubmit(true);
        setScore(countMatchingElements(answerInputs, answers));
        window.alert("채점이 완료되었습니다.");
      }
    } else {
      setSubmit(false);
      setAnswerShowed(false);
      setAnswerInputs([]);
    }
  };

  useEffect(() => {
    setAnswerShowed(false);
    setAnswerInputs([]);
    setSubmit(false);
  }, [answers]);

  return (
    <S.Wrapper>
      <S.TableTitleContainer>
        <S.TableTitle>{title}</S.TableTitle>`
        <S.TableScoreContainer>
          <S.TableScoreWrapper>
            <S.TableScoreTitle>정답 문항 수</S.TableScoreTitle>
            <S.TableScore>
              <span style={{ color: "#577dd0" }}>{isSubmit ? score : "0"}</span>{" "}
              <span style={{ color: "black" }}>/</span> {answers.length}
            </S.TableScore>
          </S.TableScoreWrapper>

          <S.TableScoreWrapper>
            <S.TableScoreTitle>표준 점수</S.TableScoreTitle>
            <S.TableScore>
              <span style={{ color: "#577dd0" }}>
                {isSubmit
                  ? scores[score] && scores[score].standardScore
                    ? scores[score].standardScore
                    : "N/A"
                  : "0"}
              </span>
            </S.TableScore>
          </S.TableScoreWrapper>

          <S.TableScoreWrapper>
            <S.TableScoreTitle>백분위</S.TableScoreTitle>
            <S.TableScore>
              <span style={{ color: "#577dd0" }}>
                {isSubmit
                  ? scores[score] && scores[score].percentile
                    ? scores[score].percentile
                    : "N/A"
                  : "0"}
              </span>
            </S.TableScore>
          </S.TableScoreWrapper>
        </S.TableScoreContainer>
      </S.TableTitleContainer>

      <S.TableContainer>
        <S.TableBody>
          {answers.map((_, index) => (
            <S.TableCellContainer key={index}>
              <S.TableCell>{index + 1} 번</S.TableCell>
              <S.TableInput
                disabled={isSubmit}
                type="tel"
                ref={(input) => (inputRefs.current[index] = input)}
                value={answerInputs[index] || ""}
                onChange={(e) => handleAnswerChange(index, e)}
              />
              {isSubmit && (
                <S.TableCell
                  style={{
                    backgroundColor: "white",
                    borderBottom: "1px solid black",
                  }}
                >
                  {answerInputs[index] === answers[index] ? (
                    <CircleOutlinedIcon
                      sx={
                        isMobile
                          ? { width: "14px", height: "14px", color: "#1f6cd9" }
                          : { width: "24px", height: "24px", color: "#1f6cd9" }
                      }
                    />
                  ) : isAnswerShowed ? (
                    <span style={{ color: "#ff5b5b" }}>{answers[index]}</span>
                  ) : (
                    <CloseIcon
                      sx={
                        isMobile
                          ? { width: "14px", height: "14px", color: "#ff5b5b" }
                          : { width: "24px", height: "24px", color: "#ff5b5b" }
                      }
                    />
                  )}
                </S.TableCell>
              )}
            </S.TableCellContainer>
          ))}
        </S.TableBody>
      </S.TableContainer>
      <S.ButtonWrapper>
        {isSubmit && (
          <Button
            color="info"
            variant="contained"
            sx={
              isMobile
                ? { width: "90px", height: "32px", fontSize: "10px" }
                : { width: "120px", height: "45px" }
            }
            onClick={() => setAnswerShowed(true)}
          >
            정답 확인하기
          </Button>
        )}

        <Button
          variant="contained"
          sx={
            isMobile
              ? { width: "90px", height: "32px", fontSize: "10px" }
              : { width: "120px", height: "45px" }
          }
          onClick={handleSubmit}
        >
          {isSubmit ? "재채점하기" : "채점하기"}
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
