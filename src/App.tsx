import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider initialState={createPage()}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider initialState={createPage()}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
