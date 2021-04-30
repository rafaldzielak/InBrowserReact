import React, { useState } from "react";
import CodeEditor from "./code-editor";
import PreviewComponent from "./preview";
import bundle from "../bundler";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState(`import 'bulma/css/bulma.css';
  import React from 'react'; 
  console.log(React);`);
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor initialValue='console.log(1)' onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <PreviewComponent code={code} />
    </>
  );
};

export default CodeCell;
