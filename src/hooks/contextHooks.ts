import { AuthContext } from "@/contexts/AuthContext";
import SnackbarContext from "@/contexts/SnackbarContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
