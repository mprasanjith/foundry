import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwt = await getToken({ req, secret });

  try {
    const response = await fetch(`https://api.github.com/gists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt?.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        description: "Untitled Draft",
        public: true,
        files: {
          "index.md": { content: "Write your content here..." },
          "foundry-metadata.json": { content: "{}" },
        },
      }),
      
    });

    const gist = await response.json();
    if (!response.ok) throw new Error("Unable to fetch");
    res.status(200).json(gist);
  } catch (err) {
    res
      .status(500)
      .json({ message: (err as Error)?.message || "Network error" });
  }
};

export default handler;
