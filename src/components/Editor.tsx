import React from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor: any = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  return (
    <MDEditor
      overflow={false}
      height={"100%"}
      value={value}
      onChange={(value: string | undefined) => setValue(value || "")}
    />
  );
};

export default Editor;
