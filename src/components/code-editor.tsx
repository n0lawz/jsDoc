import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    defaultValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue }) => {
    
    return <Editor
        height="500px"
        language="javascript"
        defaultValue={ defaultValue }
        theme="vs-dark"
        options={{
            wordWrap: 'on',
            minimap: {enabled: false},
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true
        }}
    />;
};

export default CodeEditor;