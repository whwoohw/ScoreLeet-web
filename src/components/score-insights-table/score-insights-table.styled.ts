import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  border-left: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;

  ${media.mobile(`
  width: 100%;
  `)}
`;

export const ScoreTableItemHead = styled.div`
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

export const ScoreTableItemBody = styled.div`
  height: 50px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;

  ${media.tablet(`
  font-size: 11px;
  `)}
`;
