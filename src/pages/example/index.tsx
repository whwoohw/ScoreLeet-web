import * as S from "@/pages/example/example.styled";
import {
  Alert,
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import GoogleLoginImage from "@/assets/img/google-login.png";
import UserTest from "@/assets/img/user-tests.png";
import ScoreInsightsTable from "@/assets/img/score-insights-table.png";
import ScoreInsight from "@/assets/img/score-insight.png";
import AreaInsight from "@/assets/img/area-insight.png";
import QuestionInsight from "@/assets/img/question-insight.png";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { analytics, auth } from "@/utils/firebase";
import { registerUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";

const steps = [
  {
    label: "1. 구글 로그인",
    img: [GoogleLoginImage],
    description: "먼저, 채점 결과 분석을 위해 구글 로그인을 해주세요",
  },
  {
    label: "2. 채점",
    img: [UserTest],
    description: "언어이해, 추리논증 문제를 한꺼번에 입력 후 채점해주세요",
  },
  {
    label: "3. 누적 채점 결과",
    img: [ScoreInsightsTable],
    description: "로그인 후 채점한 모든 결과를 확인하실 수 있습니다.",
  },
  {
    label: "4. 상세 결과",
    img: [ScoreInsight, AreaInsight, QuestionInsight],
    description: "각 시험결과를 상세하게 분석해드립니다.",
  },
];

export default function ScoreInsightsExample() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    logEvent(analytics, `example_next_button`);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    logEvent(analytics, `example_back_button`);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGoogleLogin = () => {
    logEvent(analytics, "example_google_login");

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (data) => {
        await registerUser(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.Wrapper>
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
        성적분석 이용방법 설명입니다.
      </Alert>
      <Box
        sx={{
          maxWidth: isMobile ? "100%" : 600,
          flexGrow: 1,
          marginTop: "50px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            marginBottom: "30px",
            fontWeight: "600",
            fontFamily: "fantasy",
          }}
        >
          {steps[activeStep].label}
        </Typography>
        <Paper
          square
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",

            marginBottom: "20px",
          }}
        >
          {steps[activeStep].img.map((i) => (
            <img
              style={isMobile ? { width: "100%" } : { width: "600px" }}
              src={i}
            />
          ))}
        </Paper>
        <Box
          sx={
            isMobile
              ? {
                  width: "100%",
                  p: 3,
                  fontSize: "14px",
                  lineHeight: "24px",
                  marginBottom: "10px",
                }
              : {
                  height: 50,
                  width: "100%",
                  p: 3,
                  fontSize: "18px",
                  marginBottom: "50px",
                }
          }
        >
          {steps[activeStep].description}
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep === maxSteps - 1 ? (
              <Button
                size="small"
                variant="contained"
                onClick={handleGoogleLogin}
              >
                로그인 후 채점분석
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            ) : (
              <Button size="small" variant="contained" onClick={handleNext}>
                다음
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button
              variant="contained"
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              이전
            </Button>
          }
        />
      </Box>
    </S.Wrapper>
  );
}
