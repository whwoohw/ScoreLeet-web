import * as S from "@/components/header/header.styled";
import { useAuth } from "@/hooks/contextHooks";
import { auth } from "@/utils/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const onLogOut = async () => {
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
            <Link to={`/score-insight}`}>
              <S.HeaderLinkItem>내 성적분석</S.HeaderLinkItem>
            </Link>
            <S.Separator> | </S.Separator>
            <S.HeaderLinkItem onClick={onLogOut}>로그아웃</S.HeaderLinkItem>
          </S.HeaderLinkList>
        ) : (
          <S.HeaderLinkList>
            <Link to="/login">
              <S.HeaderLinkItem>로그인</S.HeaderLinkItem>
            </Link>
            <S.Separator> | </S.Separator>
            <Link to="/create-account">
              <S.HeaderLinkItem>회원가입</S.HeaderLinkItem>
            </Link>
          </S.HeaderLinkList>
        )}
      </S.HeaderTop>
    </S.Wrapper>
  );
}
