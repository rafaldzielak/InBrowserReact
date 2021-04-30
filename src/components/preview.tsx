import React, { useRef, useEffect } from "react";

interface PreviewProps {
  code: string;
}

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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html; //resetting the iframe
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return <iframe ref={iframe} title='output' srcDoc={html} sandbox='allow-scripts' />;
};

export default Preview;
