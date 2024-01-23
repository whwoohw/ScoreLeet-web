import * as S from "@/components/auth-form-item/auth-form-item.styled";
import { ReactNode } from "react";

export interface AuthBoxProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthFormItem({
  title,
  subtitle,
  children,
}: AuthBoxProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      {children}
    </S.Wrapper>
  );
}
