import React, { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}

const html = `
<html>
  <head>

  </head>
  <body>
    <div id="root"></div>
      <script> 
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red";>' + err + '</div>';
        throw err;
      }
      window.addEventListener('error', (event) => {
        event.preventDefault()
        handleError(event.error)
      })
        window.addEventListener('message', (event) => {
          console.log(event.data)
          try {
            eval(event.data)
          } catch (err) {
            handleError(err);
          }
        }, false)
      </script>
    <h1>hi there</h1>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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
      {error && <div className='preview-error'>{error}</div>}
    </div>
  );
};

export default Preview;
