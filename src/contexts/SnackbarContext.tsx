// SnackbarContext.tsx
import { ReactNode, createContext, useReducer } from "react";

interface SnackbarState {
  isSnackBarOpen: boolean;
  type: "success" | "error";
  message: string;
}

interface OpenSnackbarPayload {
  message: string;
  type: "success" | "error";
}

type SnackbarAction =
  | { type: "OPEN_SNACKBAR"; payload: OpenSnackbarPayload }
  | { type: "CLOSE_SNACKBAR" };

interface SnackbarContextProps {
  snackbarState: SnackbarState;
  openSnackbar: (payload: OpenSnackbarPayload) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  snackbarState: {
    isSnackBarOpen: false,
    type: "error",
    message: "",
  },
  openSnackbar: () => {},
  closeSnackbar: () => {},
});

export const SnackbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const INITIAL_STATE: SnackbarState = {
    isSnackBarOpen: false,
    type: "error",
    message: "",
  };

  const snackbarReducer = (
    state: SnackbarState,
    action: SnackbarAction
  ): SnackbarState => {
    switch (action.type) {
      case "OPEN_SNACKBAR":
        return {
          ...state,
          isSnackBarOpen: true,
          type: action.payload.type,
          message: action.payload.message,
        };
      case "CLOSE_SNACKBAR":
        return {
          ...state,
          isSnackBarOpen: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(snackbarReducer, INITIAL_STATE);

  const openSnackbar = ({ message, type }: OpenSnackbarPayload) => {
    dispatch({
      type: "OPEN_SNACKBAR",
      payload: {
        message,
        type,
      },
    });
  };

  const closeSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  const contextValue: SnackbarContextProps = {
    snackbarState: state,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
