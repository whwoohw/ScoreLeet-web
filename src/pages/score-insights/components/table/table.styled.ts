import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${media.mobile(`
    gap: 20px;
  `)}
`;

export const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  ${media.mobile(`
    font-size: 20px;
  `)}
`;
