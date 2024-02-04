import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
export const SelectGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  ${media.mobile(`
    gap: 15px;
    align-items: end;
  `)}
`;
