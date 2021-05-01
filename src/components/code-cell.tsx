import React, { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import PreviewComponent from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState(`import 'bulma/css/bulma.css';
  import React from 'react'; 
  console.log(React);`);
  const [code, setCode] = useState("");
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue='console.log(1)' onChange={(value) => setInput(value)} />
        </Resizable>

        {/* <div>
        <button onClick={onClick}>Submit</button>
      </div> */}
        <PreviewComponent code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
