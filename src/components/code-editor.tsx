import './code-editor.css';
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
        const unformatted = editorRef.current.getModel().getValue();

        // format the value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');

        // set the formatted value back in the editor
        editorRef.current.setValue(formatted);
    }   

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
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