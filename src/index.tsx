import "bulmaswatch/superhero/bulmaswatch.min.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";

const App: React.FC = () => {
  return (
    <>
      <CodeCell />
      <CodeCell />
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
