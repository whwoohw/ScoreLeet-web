import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 20px 0;
  ${media.mobile(`
    margin: 10px 0;
  `)}
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: grey;
  margin-bottom: 10px;
`;
