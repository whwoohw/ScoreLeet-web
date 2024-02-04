import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const AlertWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
`;

export const ChartWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  height: 600px;
  width: 80%;
  ${media.tablet(`
    width: 100%;
    height: 500px;
  `)}

  ${media.mobile(`
    height: 400px;
  `)}
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;

  ${media.tablet(`
  width: 100%;
  `)}
`;
