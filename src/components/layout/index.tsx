import * as S from "@/components/layout/layout.styled";

import { Outlet } from "react-router-dom";

import Header from "../header";
import Footer from "../footer";

import { useSnackbar } from "@/hooks/contextHooks";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function Layout() {
  const { snackbarState, closeSnackbar } = useSnackbar();

  return (
    <S.Wrapper>
      <Header />
      <S.BodyWrapper>
        <Outlet />
      </S.BodyWrapper>
      <Footer />
      <Snackbar
        open={snackbarState.isSnackBarOpen}
        autoHideDuration={5000}
        onClose={closeSnackbar}
      >
        <MuiAlert
          onClose={closeSnackbar}
          severity={snackbarState.type}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </MuiAlert>
      </Snackbar>
    </S.Wrapper>
  );
}
