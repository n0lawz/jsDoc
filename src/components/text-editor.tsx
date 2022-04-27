import './text-editor.css';
import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>('hi');
  const { updateCell } = useActions();

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
        <MDEditor value={cell.content} onChange={(value?: string | undefined) => updateCell(cell.id, value || '')} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content} />
      </div>
    </div>
  ); 
};

export default TextEditor;