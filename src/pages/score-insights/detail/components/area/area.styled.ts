import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  width: 100%;
  gap: 60px;
  ${media.tablet(`
  display: flex;
  flex-direction: column;
  width: 100%;
  `)}
`;

export const AreaTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const AreaRadarChartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 400px;
  flex-direction: column;
`;
