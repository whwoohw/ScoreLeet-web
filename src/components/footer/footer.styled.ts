import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;

  ${media.mobile(`
  height: 40px;
  `)}
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border-top: 1px solid #bdbdbd; */
  padding: 20px 10%;
`;

export const Info = styled.p`
  font-size: 14px;
`;
