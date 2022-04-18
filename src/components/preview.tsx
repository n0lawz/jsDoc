import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try{
                        eval(event.data);
                    } catch(err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
                        console.error(err);
                    }
                }, false); 
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // clears iframe content before next render
    iframe.current.srcdoc = html;

    // join together all the output files of the bundle
    // updates code piece of state where the output of our bundle is stored
    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="code-preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
