import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";
import TextEditor from "./components/text-editor";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TextEditor />
      {/* <CodeCell /> */}
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
