import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';


interface CodeEditorProps {
    defaultValue: string,
    onChange(value: string):  void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange,defaultValue }) => {
    const editorRef = useRef<any>();

    const onEditorMount: OnMount = (editor, _monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => onChange(editor.getValue()));
        editor.getModel()?.updateOptions({ tabSize: 2 })
    };

    const onFormatClick = () => {
        // get current value from editor
    }   

    return (
        <div>
            <button onClick={onFormatClick}>Format</button>
        <Editor
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
        />
        </div>
    );
};

export default CodeEditor;