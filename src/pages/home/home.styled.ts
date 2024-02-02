import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const AlertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const SelectGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  ${media.mobile(`
    gap: 15px;
  `)}
`;
