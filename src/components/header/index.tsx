import * as S from "@/components/header/header.styled";
import { useAuth } from "@/hooks/contextHooks";
import { auth } from "@/utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginImage from "@/assets/svg/web_light_sq_na.svg?react";
import { Button } from "@mui/material";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { registerUser } from "@/api/auth";

export default function Header() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
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
          <S.Logo>LEET 기출 채점</S.Logo>
        </Link>
        {currentUser ? (
          <S.HeaderLinkList>
            <Link to="/score-insight">
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
              sx={{
                backgroundColor: "#4285f4",
                height: "45px",
                padding: "10px 7px",
              }}
              startIcon={<GoogleLoginImage />}
            >
              구글 계정으로 로그인
            </Button>
          </S.HeaderLinkList>
        )}
      </S.HeaderTop>
    </S.Wrapper>
  );
}
