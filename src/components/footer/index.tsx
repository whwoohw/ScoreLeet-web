import * as S from "@/components/footer/footer.styled";

import { Alert, useMediaQuery } from "@mui/material";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <S.Wrapper>
      <Alert
        severity="warning"
        sx={
          isMobile
            ? {
                width: "100%",
                height: "max-content",
                fontSize: "10.5px",
              }
            : {
                display: "flex",
                width: "max-content",
                fontSize: "14px",
              }
        }
      >
        혹시 에러나 문의사항이 있으시다면, scoreleet@gmail.com 으로 연락주세요!
      </Alert>
    </S.Wrapper>
  );
}
