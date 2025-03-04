import "./App.css";
import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

function App() {
  return (
    <AppStateProvider initialState={createPage()}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
