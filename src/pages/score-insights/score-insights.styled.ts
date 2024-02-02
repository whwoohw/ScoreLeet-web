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

export const TableWrapper = styled.div`
  display: flex;
  width: max-content;

  ${media.tablet(`
  width: 100%;
  `)}
`;
