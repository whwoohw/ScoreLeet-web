import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SelectGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  ${media.mobile(`
    gap: 15px;
  `)}
`;

export const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const ChartWarpper = styled.div`
  width: 400px;
  height: 300px;
  ${media.mobile(`
    width: 100%;
  `)}
`;
