import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: 0 10% 100px 10%;

  ${media.mobile(`
    padding: 0 3%;
  `)}
`;
