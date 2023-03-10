import { type GetServerSideProps, type NextPage } from "next";
import { useState } from "react";
import { getToken } from "next-auth/jwt";
import Editor from "../components/Editor";
import EditorHeader from "../components/EditorHeader";
import WikipediaSearch from "../components/ResearchSidebar";
import { getGistById, getGistContent } from "./api/gists/[id]";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const secret = process.env.NEXTAUTH_SECRET;

const EditorPage: NextPage<any> = ({ data, content: initialContent }) => {
  const { query } = useRouter();
  const [title, setTitle] = useState<string>(data?.description);
  const [content, setContent] = useState<string>(initialContent);

  const update = async () => {
    const res = await fetch(`/api/gists/${query.id}/update`, {
      body: JSON.stringify({
        description: title,
        files: {
          "foundry-metadata.json": { content: "{}" },
          "index.md": { content },
        },
      }),
      method: "POST",
    });
    if (res.ok) {
      toast.success("Saved successfully!");
    } else {
      toast.error("Failed to save");
    }
  };

  return (
    <main className="flex h-screen flex-col items-stretch justify-between bg-white">
      <EditorHeader
        title={title}
        setTitle={setTitle}
        onUpdate={update}
      />
      <div className="flex w-full flex-shrink flex-grow basis-0 flex-row overflow-scroll">
        <div className="flex-1">
          <Editor value={content} setValue={setContent} />
        </div>
        <div className="sticky top-0 bottom-0 basis-1/4 overflow-y-auto">
          <WikipediaSearch />
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const existingGistId = context.query?.id as string;
  if (!existingGistId) return { props: {} };

  const jwt = await getToken({ req: context.req, secret });
  const data = await getGistById(existingGistId, jwt?.accessToken);

  const content = await getGistContent(
    data.files["index.md"].raw_url,
    jwt?.accessToken
  );

  return {
    props: { data, content },
  };
};

export default EditorPage;
