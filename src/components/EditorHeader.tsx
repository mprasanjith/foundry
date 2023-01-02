import React, { FC, useState } from "react";

const EditorHeader: FC<any> = ({ title, setTitle }) => {
  return (
    <header className="flex items-center justify-between bg-gray-300 px-4 py-3">
      <input
        className="rounded-lg border-2 border-gray-400 px-2 py-1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="rounded-lg bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700">
          Share
        </button>
        <button className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Publish
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;
