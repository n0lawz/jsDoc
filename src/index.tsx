import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

const App = () => {
    const [code, setCode] = useState('');
    // code the user writes into text area
    const [input, setInput] = useState('');

    // function that takes input from user and bundles
    // we use setCode to update state
    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
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
        );
    
};

// this is how we render in react 18. replaced reactdom.render()
const container = document.querySelector('#root');
if (!container) throw new Error('failed to find root element'); // so tsc knows container won't be null
const root = ReactDOM.createRoot(container);
root.render(<App />)


