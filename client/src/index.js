import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/montserrat";
import App from "./App";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "./global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
