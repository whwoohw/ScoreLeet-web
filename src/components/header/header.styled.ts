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
  font-size: 30px;
  color: black;
`;

export const HeaderLinkList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const HeaderLinkItem = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
`;

export const Separator = styled.p`
  font-size: 12px;
  color: #bdbdbd;
`;