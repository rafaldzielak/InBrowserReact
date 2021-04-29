import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App: React.FC = () => {
  const [input, setInput] = useState(`import 'bulma/css/bulma.css';
  import React from 'react'; 
  console.log(React);`);
  const ref = useRef<any>();
  const iframe = useRef<any>();

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
    iframe.current.srcdoc = html; //resetting the iframe
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: { "process.env.NODE_ENV": '"production"', global: "window" }, //double quotes replaces the value of NODE_ENV, not the parameter
    });
    console.log(result);
    // setCode(result.outputFiles[0].text);
    // We do not want that:
    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (error) {
    //   alert(error);
    // }
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };
  const html = `
    <html>
      <head>

      </head>
      <body>
        <div id="root"></div>
          <script> 
            window.addEventListener('message', (event) => {
              console.log(event.data)
              try{
                eval(event.data)
              } catch (err) {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red";>' + err + '</div>'
                throw err
              }
              
            }, false)
          </script>
        <h1>hi there</h1>
      </body>
    </html>
  `;
  return (
    <>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframe} title='output' srcDoc={html} sandbox='allow-scripts' />
    </>
  );
};

export default App;

ReactDOM.render(<App />, document.querySelector("#root"));
