import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/home/home.styled";
import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to={"/user-test"} />;
  }
  return (
    <S.Wrapper>
      <S.ButtonContainer>
        <Link to={"/scoring"}>
          <Button variant="contained" sx={{ width: "200px", height: "200px" }}>
            채점하러 가기
          </Button>
        </Link>
        <Link to={"/score-insights"}>
          <Button variant="outlined" sx={{ width: "200px", height: "200px" }}>
            로그인 후<br />
            결과 분석하기
          </Button>
        </Link>
      </S.ButtonContainer>
    </S.Wrapper>
  );
}
