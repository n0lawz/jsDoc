import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';


const App = () => {
    const ref = useRef<any>();
    const [code, setCode] = useState('');
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

        setCode(result.outputFiles[0].text);
    };

    return (
        <div>
            <CodeEditor 
                defaultValue='Type code here'
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector('#root');
if (!container) throw new Error('failed to find root element'); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />)


