import * as S from "@/components/score-insights-item/score-insights-item.styled";
import { ReactNode } from "react";

export interface ScoreInsightsItemProps {
  title: string;
  children: ReactNode;
}

export default function ScoreInsightsItem({
  title,
  children,
}: ScoreInsightsItemProps) {
  return (
    <S.Wrapper>
      <S.ScoreInsightsTitle>{title}</S.ScoreInsightsTitle>
      <S.ScoreInsightsContainer>{children}</S.ScoreInsightsContainer>
    </S.Wrapper>
  );
}
