import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';


const App = () => {
    const ref = useRef<any>();
    // code the user writes into text area
    const [input, setInput] = useState('');

    // the output from our esbuild tool. transpiled and bundled code we will dispaly in pre element
    const [code, setCode] = useState('');

    // initializing esbuild by finding esbuild.wasm binary in public folder
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
        setCode(result.outputFiles[0].text);
    };

    const html = `
        <script>
            ${code}
        </script>
    `


    return (
        <div>
            <textarea value ={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
            <iframe title="user code" sandbox="allow-scripts" srcDoc={html} />
        </div>
    )
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector('#root');
if (!container) throw new Error('failed to find root element'); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />)


