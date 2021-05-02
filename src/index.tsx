import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";
import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CellList />
      {/* <CodeCell /> */}
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
