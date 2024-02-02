import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 30px;

  ${media.tablet(`
    width: 100%;
  `)}
`;
