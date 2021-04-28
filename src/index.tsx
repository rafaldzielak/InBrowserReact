import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App: React.FC = () => {
  const [input, setInput] = useState(`import 'bulma/css/bulma.css';
  import React from 'react'; 
  console.log(React);`);
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    console.log(ref.current);
    if (!ref.current) return;
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: { "process.env.NODE_ENV": '"production"', global: "window" }, //double quotes replaces the value of NODE_ENV, not the parameter
    });
    console.log(result);
    setCode(result.outputFiles[0].text);
    // We do not want that:
    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (error) {
    //   alert(error);
    // }
  };
  return (
    <>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe src='/test.html' sandbox='allow-same-origin' />
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
