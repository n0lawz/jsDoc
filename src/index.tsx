import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


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
            wasmURL: '/esbuild.wasm'
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

        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        });

        setCode(result.code);
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

ReactDOM.render(<App />, document.querySelector('#root'));

