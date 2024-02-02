import { media } from "@/styles/media";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const TableTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TableTitle = styled.h3`
  font-size: 30px;
  font-weight: bold;
  ${media.mobile(`
    font-size: 20px;
  `)}
`;

export const TableScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  ${media.mobile(`
    gap: 10px;
  `)}
  align-items: center;
`;

export const TableScoreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  ${media.mobile(`
    gap: 8px;
  `)}
  align-items: center;
`;

export const TableScoreTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  ${media.mobile(`
    font-size: 12px;
  `)}
`;

export const TableScore = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
  ${media.mobile(`
    font-size: 10px;
  `)}
`;

export const TableContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  margin-top: 20px;
  border-top: 1px solid #dfdfdf;
  width: 100%;
`;

export const TableBody = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  ${media.tablet(`
    grid-template-columns: repeat(7, 1fr);
  `)}

  ${media.mobile(`
    grid-template-columns: repeat(5, 1fr);
  `)}

  gap: 0;
  width: 100%;
  border-left: 1px solid #dfdfdf;
`;

export const TableCellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableCell = styled.div`
  font-size: 16px;
  height: 45px;

  ${media.mobile(`
    height: 28px;
    font-size: 10px;
  `)}

  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dfdfdf;
`;

export const TableInput = styled.input`
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  /* color: #1976d2; */

  ${media.mobile(`
    height: 28px;
    font-size: 10px;
  `)}

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-left: none;
  width: 100%;
  text-align: center;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px blue inset;
  }

  &:disabled {
    background-color: white;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
  gap: 40px;

  ${media.mobile(`
  gap: 20px
  `)}
`;
