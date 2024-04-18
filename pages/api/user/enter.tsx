import { NextApiResponse, NextApiRequest } from 'next';
import db from '@lib/db';
import { withHandler, ResponseType } from '@lib/server/withHandler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ ok: false });

  await db.user.create({ data: { email, name } });

  return res.json({
    ok: true,
  });
}

export default withHandler({
  method: 'POST',
  handler,
});
