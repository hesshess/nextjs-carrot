import { NextApiResponse, NextApiRequest } from "next";
import db from "@lib/db";
import { withHandler, ResponseType } from "@lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ ok: false });
  const token = await db.token.create({
    data: {
      payload: Math.floor(100000 + Math.random() * 900000) + "",
      user: {
        connectOrCreate: {
          where: {
            ...(email && { email }),
          },
          create: {
            name,
            email,
          },
        },
      },
    },
  });
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
