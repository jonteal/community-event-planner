import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});
import "./App.css";
import Members from "./components/Members/Members";
import Header from "./components/Members/Header/Header";
import Calendar from "./pages/Calendar/Calendar";
import CreateEvent from "./pages/CreateEvent/CreateEvent";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/create-event" element={<CreateEvent />} />
              {/* <Route path="/subjects/:id" element={<Subject />} />
              <Route path="/indexCards/:id" element={<IndexCard />} />
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
