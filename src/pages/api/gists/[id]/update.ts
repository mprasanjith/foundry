import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const jwt = await getToken({ req, secret });

  try {
    const response = await fetch(`https://api.github.com/gists/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt?.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      body: req.body,
    });
    if (!response.ok) throw new Error("Unable to fetch");

    const gist = await response.json();
    res.status(200).json(gist);
  } catch (err) {
    res
      .status(500)
      .json({ message: (err as Error)?.message || "Network error" });
  }
};

export default handler;
