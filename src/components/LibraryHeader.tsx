import React from "react";
import { signOut } from "next-auth/react";

const LibraryHeader = () => {
  return (
    <header className="flex items-center justify-between bg-gray-300 px-4 py-3">
      <h1>
        <span className="font-bold">Foundry</span>
        <span className="font-light">Publishing</span>
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => signOut()}
          className="mx-auto my-1 rounded-full bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-900"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default LibraryHeader;
