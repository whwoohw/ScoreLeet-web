import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "./utils/firebase";
import Loading from "./components/loading/loading";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Layout from "./components/layout/layout";
import { GlobalStyles } from "./styles/globalstyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
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
