import { GetServerSideProps } from "next";
import React, { FC, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";
import { getGistById, getGistContent } from "../api/gists/[id]";
import { DiscussionEmbed } from "disqus-react";
import { useRouter } from "next/router";
import SocialShare from "../../components/SocialShare";

const BlogPost: FC<any> = ({ data, content }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 pt-8 pb-16">
      <div className="mb-8 text-center text-lg text-gray-400">
        <div className="text-gray-600">
          <span className="font-bold">Foundry</span>
          <span className="font-light">Publishing</span>
        </div>
        <div className="text-sm font-light">
          The elegant Markdown publishing tool
        </div>
      </div>

      <div className="drop-shadow-xl">
        <article className="border-1 max-w-fit rounded-t-2xl bg-white px-32 pt-24 pb-12">
          <h2 className="mb-2 text-3xl font-bold">{data?.description}</h2>
          <h5 className="text-md mb-8 font-medium text-slate-500">
            Post by {data.owner?.login} -{" "}
            {formatDistanceToNow(new Date(data?.created_at), {
              addSuffix: true,
            })}
          </h5>
          <div className="prose prose-slate">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>

        <div className="rounded-b-2xl bg-gray-100 px-32 pt-12 pb-24">
          <DiscussionEmbed
            shortname="foundry-app"
            config={{
              url: `https://foundryeditor.vercel.app/posts/${router.query.id}`,
              identifier: data.id,
              title: data.description,
              language: "en_US",
            }}
          />
        </div>
      </div>

      <SocialShare data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const existingGistId = context.query?.id as string;
  if (!existingGistId) return { props: {} };

  const data = await getGistById(existingGistId);

  const content = await getGistContent(data.files["index.md"].raw_url);

  return {
    props: { data, content },
  };
};

export default BlogPost;
