import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/plus-jakarta-sans";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = extendTheme({
  fonts: {
    heading: `"Plus Jakarta Sans Variable", sans-serif`,
    body: `"Plus Jakarta Sans Variable", sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
