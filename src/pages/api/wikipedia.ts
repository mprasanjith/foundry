import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${req.query.query}&format=json`
    );
    if (!response.ok) throw new Error("Unable to fetch");

    const data = await response.json();
    res.status(200).json(data.query.search);
  } catch (err) {
    res
      .status(500)
      .json({ message: (err as Error)?.message || "Network error" });
  }
};

export default handler;
