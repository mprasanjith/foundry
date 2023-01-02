import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const getGistById = async (id: string, accessToken?: string) => {
  const response = await fetch(`https://api.github.com/gists/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch");

  const gist = await response.json();
  return gist;
};

export const getGistContent = async (url: string, accessToken?: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch");

  const gistContent = await response.text();
  return gistContent;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const jwt = await getToken({ req, secret });

  try {
    const gist = await getGistById(id, jwt?.accessToken);
    res.status(200).json(gist);
  } catch (err) {
    res
      .status(500)
      .json({ message: (err as Error)?.message || "Network error" });
  }
};

export default handler;
