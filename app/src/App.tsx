import React from "react";
import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Plaid } from "./components/Plaid";
import { Box, Container, CssBaseline } from "@material-ui/core";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <CssBaseline></CssBaseline>
      <ApolloProvider client={client}>
        <Container maxWidth="md">
          <Box my={4}>
            <Plaid />
          </Box>
        </Container>
      </ApolloProvider>
    </>
  );
}

export default App;
