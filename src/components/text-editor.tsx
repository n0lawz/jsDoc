import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";


const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('hi');

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
      <div ref={ref}>
        <MDEditor value={value} onChange={(value: string,) => setValue(value)} />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# Header"} />
    </div>

  ) 
};

export default TextEditor;