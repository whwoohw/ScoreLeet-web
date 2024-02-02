import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
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

export const HeaderTop = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding: 0 10%;
`;

export const Logo = styled.h3`
  color: black;
  font-weight: bold;
  /* font-family: Georgia, serif; */
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-style: oblique;
  font-size: 35px;

  ${media.mobile(`
    font-size: 24px;
  `)}
`;

export const HeaderLinkList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  ${media.mobile(`
    gap: 8px;
  `)}
`;

export const HeaderLinkItem = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: black;
  &:hover {
    color: #577dd0;
  }

  ${media.mobile(`
    font-size: 10px;
    line-height: 16px;
  `)}
`;

export const Separator = styled.p`
  font-size: 12px;
  color: #bdbdbd;

  ${media.mobile(`
    font-size: 8px;
  `)}
`;
