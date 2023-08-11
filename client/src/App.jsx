import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});
import "./App.css";
import Members from "./components/Members/Members";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <h1 className="text-3xl font-bold underline">
          Community Event Planning!
        </h1>
        <Members />
      </ApolloProvider>
    </>
  );
}

export default App;
