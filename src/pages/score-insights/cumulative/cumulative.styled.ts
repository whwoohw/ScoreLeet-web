import { media } from "@/styles/media";
import styled from "styled-components";

export const SelectGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  ${media.mobile(`
    gap: 15px;
  `)}
`;

export const ChartWarpper = styled.div`
  width: 400px;
  height: 300px;
  ${media.mobile(`
    width: 100%;
  `)}
`;
