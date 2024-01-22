import styled from "styled-components";

import { Link } from "react-router-dom";
import { media } from "@/styles/media";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;

  ${media.mobile(`
  height: 70px;
  `)}
  display: flex;
  flex-direction: column;
  background-color: white;
  position: fixed;
  z-index: 100;
`;

const HeaderTop = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding: 0 10%;
`;

const Logo = styled.h3`
  font-size: 30px;
  color: black;
`;

export default function Header() {
  // const currentUser = false;
  // const navigate = useNavigate();

  // const onLogOut = async () => {
  //   const ok = confirm("로그아웃 하시겠습니까?");
  //   if (ok) {
  //     await auth.signOut();
  //     navigate("/");
  //   }
  // };

  return (
    <Wrapper>
      <HeaderTop>
        <Link to="/">
          <Logo>LEET 기출 채점</Logo>
        </Link>
      </HeaderTop>
    </Wrapper>
  );
}
