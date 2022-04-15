import Editor from '@monaco-editor/react';

const CodeEditor = () => {
    
    return <Editor
        height="500px"
        defaultLanguage="javascript"
        defaultValue="Type code here"
    />;
};

export default CodeEditor;