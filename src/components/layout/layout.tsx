import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

import { media } from "@/styles/media";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BodyWrapper = styled.div`
  padding: 120px 10%;
  ${media.mobile(`
    padding: 100px 3%;
  `)}
  width: 100%;
  display: flex;
  justify-content: center;
`;
export default function Layout() {
  return (
    <Wrapper>
      <Header />
      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
      <Footer />
    </Wrapper>
  );
}
