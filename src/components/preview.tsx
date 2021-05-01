import React, { useRef, useEffect } from "react";
import "./preview.css";

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
    // Delaying the message, because it might go into old frame
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className='preview-wrapper'>
      <iframe ref={iframe} title='output' srcDoc={html} sandbox='allow-scripts' />
    </div>
  );
};

export default Preview;
