import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "./utils/firebase";
import Loading from "./components/loading";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import { GlobalStyles } from "./styles/globalstyles";
import Login from "./pages/login";
import CreateAccount from "./pages/create-account";
import ScoreInsight from "./pages/score-insight";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
      {
        path: "score-insight",
        element: <ScoreInsight />,
      },
    ],
  },
]);

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

function App() {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />

      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
