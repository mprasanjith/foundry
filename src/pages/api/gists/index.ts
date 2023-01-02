import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const jwt = await getToken({ req, secret });
  
  try {
    const response = await fetch(`https://api.github.com/gists`, {
      headers: {
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
    });
    if (!response.ok) throw new Error("Unable to fetch");

    const gists = await response.json();

    const foundryGists = gists.filter(
      (gist: any) =>
        Object.keys(gist.files).includes("foundry-metadata.json") &&
        Object.keys(gist.files).includes("index.md")
    );

    res.status(200).json(foundryGists);
  } catch (err) {
    res
      .status(500)
      .json({ message: (err as Error)?.message || "Network error" });
  }
};

export default handler;
