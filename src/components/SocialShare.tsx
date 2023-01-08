import { useRouter } from "next/router";
import type { FC } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const SocialShare: FC<any> = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-1/2 translate-y-1/2 right-16 flex flex-col gap-2 rounded-full bg-white px-4 py-6">
      <FacebookShareButton
        url={`https://foundryeditor.vercel.app/posts/${router.query.id}`}
      >
        <FacebookIcon
          size={32}
          round={true}
          bgStyle={{ fill: "none" }}
          iconFillColor="gray"
        />
      </FacebookShareButton>

      <TwitterShareButton
        url={`https://foundryeditor.vercel.app/posts/${router.query.id}`}
      >
        <TwitterIcon
          size={32}
          round={true}
          bgStyle={{ fill: "none" }}
          iconFillColor="gray"
        />
      </TwitterShareButton>

      <LinkedinShareButton
        url={`https://foundryeditor.vercel.app/posts/${router.query.id}`}
      >
        <LinkedinIcon
          size={32}
          round={true}
          bgStyle={{ fill: "none" }}
          iconFillColor="gray"
        />
      </LinkedinShareButton>

      <TelegramShareButton
        url={`https://foundryeditor.vercel.app/posts/${router.query.id}`}
      >
        <TelegramIcon
          size={32}
          round={true}
          bgStyle={{ fill: "none" }}
          iconFillColor="gray"
        />
      </TelegramShareButton>

      <RedditShareButton
        url={`https://foundryeditor.vercel.app/posts/${router.query.id}`}
      >
        <RedditIcon
          size={32}
          round={true}
          bgStyle={{ fill: "none" }}
          iconFillColor="gray"
        />
      </RedditShareButton>
    </div>
  );
};

export default SocialShare;
