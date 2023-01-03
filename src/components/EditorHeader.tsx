import { useRouter } from "next/router";
import React, { type FC } from "react";
import { toast } from "react-toastify";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const EditorHeader: FC<any> = ({ title, setTitle, onUpdate }) => {
  const router = useRouter();
  const [_, copyLink] = useCopyToClipboard();

  function onCopy() {
    copyLink(`https://foundryeditor.vercel.app/posts/${router.query.id}`);
    toast.success("Copied to clipboard");
  }

  return (
    <header className="flex items-center justify-between bg-gray-300 px-4 py-3">
      <input
        className="rounded-lg border-2 border-gray-400 px-2 py-1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          className="rounded-lg bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
        >
          Copy Link
        </button>
        <button
          onClick={onUpdate}
          className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;
