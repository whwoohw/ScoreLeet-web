import * as S from "@/components/header/header.styled";
import { useAuth } from "@/hooks/contextHooks";
import { analytics, auth } from "@/utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginImage from "@/assets/svg/google_logo.svg?react";
import { Button, useMediaQuery } from "@mui/material";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { registerUser } from "@/api/auth";
import { logEvent } from "firebase/analytics";

export default function Header() {
  const { currentUser } = useAuth();

  const isMobile = useMediaQuery("(max-width: 600px)");

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    logEvent(analytics, "header_google_login");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (data) => {
        await registerUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };

  return (
    <S.Wrapper>
      <S.HeaderTop>
        <Link to="/">
          <S.Logo>Score Leet</S.Logo>
        </Link>
        {currentUser ? (
          <S.HeaderLinkList>
            <Link to="/user-test">
              <S.HeaderLinkItem>채점</S.HeaderLinkItem>
            </Link>
            <S.Separator> | </S.Separator>
            <Link to="/score-insights">
              <S.HeaderLinkItem>내 성적분석</S.HeaderLinkItem>
            </Link>
            <S.Separator> | </S.Separator>
            <S.HeaderLinkItem onClick={handleLogOut}>로그아웃</S.HeaderLinkItem>
          </S.HeaderLinkList>
        ) : (
          <S.HeaderLinkList>
            <Button
              onClick={handleGoogleLogin}
              variant="contained"
              sx={
                isMobile
                  ? {
                      backgroundColor: "#4285f4",
                      height: "30px",
                      padding: "10px",
                    }
                  : {
                      backgroundColor: "#4285f4",
                      height: "45px",
                      padding: "10px",
                    }
              }
              startIcon={
                isMobile ? (
                  <GoogleLoginImage style={{ width: 20, height: 20 }} />
                ) : (
                  <GoogleLoginImage style={{ width: 36, height: 36 }} />
                )
              }
            >
              {isMobile ? "구글 로그인" : "구글 계정으로 로그인"}
            </Button>
          </S.HeaderLinkList>
        )}
      </S.HeaderTop>
    </S.Wrapper>
  );
}
