import { NextApiResponse, NextApiRequest } from 'next';
import db from '@lib/db';
import { withHandler, ResponseType } from '@lib/server/withHandler';
import { withApiSession } from '@lib/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const found = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!found) return res.status(404).end();
  req.session.user = {
    id: found.id,
  };
  await req.session.save();
  console.log('1234');
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  })
);
