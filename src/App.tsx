import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

const Auth = () => {
  return <></>;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <AppStateProvider initialState={createPage()}>
            <Page />
          </AppStateProvider>
        }
      />
      <Route
        path="/"
        element={
          <AppStateProvider initialState={createPage()}>
            <Page />
          </AppStateProvider>
        }
      />
    </Routes>
  );
}

export default App;
