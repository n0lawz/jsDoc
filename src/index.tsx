import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';


const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>();
    // code the user writes into text area
    const [input, setInput] = useState('');

    // initializing esbuild by fetcbj g esbuild.wasm binary from unpkg
    // used useRef hook to have access outside of startService function
    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    };

    // calling startService once when we start our application
    useEffect(() => {
        startService();
    }, []);

    // function that builds bundle and stores it in result
    const onClick = async () => {
        if (!ref.current) {
            return;
        }

        // clears iframe content before next render
        iframe.current.srcdoc = html;

        // what we get back from onClick
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        });

         // join together all the output files of the bundle
         // updates code piece of state where the output of our bundle is stored
        // setCode(result.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

    };

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
    `


    return (
        <div>
            <CodeEditor 
                defaultValue='Type code here'
                onChange={(value) => setInput(value)}
            />
            <textarea value ={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe  ref={iframe} title="code-preview" sandbox="allow-scripts" srcDoc={html} />
        </div>
    )
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector('#root');
if (!container) throw new Error('failed to find root element'); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />)


