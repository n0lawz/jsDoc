import Editor from '@monaco-editor/react';
import { useRef } from 'react';

interface CodeEditorProps {
    defaultValue: string,
    onChange(value: string):  void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange,defaultValue }) => {
    const editorRef = useRef<any>();

    const onEditorMount = (editor: any, _monaco: any) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => onChange(editor.getValue()));
        editor.getModel()?.updateOptions({ tabSize: 2 })
    };

    return <Editor
        onMount={onEditorMount}
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