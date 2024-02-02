import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const ScoreInsightsTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  ${media.mobile(`
    font-size: 20px;
  `)}
`;

export const ScoreInsightsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
`;
