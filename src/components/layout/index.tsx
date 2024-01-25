import * as S from "@/components/layout/layout.styled";

import { Outlet } from "react-router-dom";

import Header from "../header";
import Footer from "../footer";

export default function Layout() {
  return (
    <S.Wrapper>
      <Header />
      <S.BodyWrapper>
        <Outlet />
      </S.BodyWrapper>
      <Footer />
    </S.Wrapper>
  );
}
