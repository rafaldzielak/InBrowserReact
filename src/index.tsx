import "bulmaswatch/superhero/bulmaswatch.min.css";
import React from "react";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App: React.FC = () => {
  return (
    <>
      <TextEditor />
      {/* <CodeCell /> */}
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
