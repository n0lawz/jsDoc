import './text-editor.css';
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";


const TextEditor: React.FC<MDEditorProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>('hi');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return
      }
      
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true});

    return (() => {
      document.removeEventListener('click', listener, {capture: true})
    })
  }, []);


  if (editing) {
    return (
      <div data-color-mode="dark" className='text-editor' ref={ref}>
        <MDEditor value={value} onChange={(value?: string | undefined) => setValue(value!)} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  ); 
};

export default TextEditor;