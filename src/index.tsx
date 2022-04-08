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

    // function called on onClick event
    const onClick = async () => {
        if (!ref.current) {
            return;
        }

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

         console.log(result);

        setCode(result.outputFiles[0].text);

        try {
            eval(result.outputFiles[0].text)
        } catch (err) {
            alert(err);
        }
    };


    return (
        <div>
            <textarea value ={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    )
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector('#root');
if (!container) throw new Error('failed to find root element'); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />)


