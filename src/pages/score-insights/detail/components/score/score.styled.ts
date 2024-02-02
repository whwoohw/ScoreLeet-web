import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  width: 100%;
  gap: 100px;

  ${media.tablet(`
  display: flex;
  flex-direction: column;
  width: 100%;
  `)}
`;

export const ChartWrapper = styled.div`
  height: 300px;
  ${media.mobile(`
    width: 100%;
  `)}
`;
