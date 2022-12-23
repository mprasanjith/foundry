import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Editor from "../components/Editor";
import EditorHeader from "../components/EditorHeader";
import WikipediaSearch from "../components/ResearchSidebar";

const EditorPage: NextPage = () => {
  const [content, setContent] = useState<string>(
    "Type your post here!"
  );

  return (
    <>
      <Head>
        <title>Foundry - The smart Markdown publishing tool</title>
        <meta name="description" content="Foundry - The smart writing tool!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-stretch justify-between bg-white">
        <EditorHeader />
        <div className="flex w-full flex-shrink flex-grow basis-0 flex-row overflow-scroll">
          <div className="flex-1">
            <Editor value={content} setValue={setContent} />
          </div>
          <div className="sticky top-0 bottom-0 basis-1/4 overflow-y-auto">
            <WikipediaSearch />
          </div>
        </div>
      </main>
    </>
  );
};

export default EditorPage;
