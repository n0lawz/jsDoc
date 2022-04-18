import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
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
            <Resizable direction='vertical'>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <CodeEditor 
                    defaultValue='Type code here'
                    onChange={(value) => setInput(value)}
                />
                <Preview code={code} />
            </div>
            </Resizable>
        );
    
};

export default CodeCell;