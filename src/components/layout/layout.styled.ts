import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const BodyWrapper = styled.div`
  padding: 120px 10%;
  ${media.mobile(`
    padding: 100px 3%;
  `)}
  width: 100%;
  display: flex;
  justify-content: center;
`;
