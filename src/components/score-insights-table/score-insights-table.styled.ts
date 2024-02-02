import { media } from "@/styles/media";
import styled from "styled-components";

interface ScoreInsightsTableWrapperProps {
  content: number;
  height: number;
}

export const ScoreInsightsTableWrapper = styled.div<ScoreInsightsTableWrapperProps>`
  width: 100%;
  height: ${(props) => `${props.height}px`};
  display: grid;

  grid-template-columns: ${(props) => `repeat(${props.content}, 1fr)`};
  gap: 0;
  border-left: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;

  ${media.mobile(`
  width: 100%;
  `)}
`;

export const ScoreInsightsTableItemHead = styled.div`
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;

  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;

  ${media.tablet(`
  font-size: 12px;
  `)}
`;

export const ScoreInsightsTableItemBody = styled.div`
  height: 50px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-items: center;

  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;

  ${media.tablet(`
  font-size: 11px;
  `)}
`;

export const AreaTableTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

export const AreaTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
