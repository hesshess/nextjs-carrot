import { NextApiResponse, NextApiRequest } from 'next';
import db from '@lib/db';
import { withHandler, ResponseType } from '@lib/server/withHandler';
import { withApiSession } from '@lib/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const user = await db.user.findUnique({
    where: {
      id: req.session.user.id,
    },
  });
  res.json({
    ok: true,
    user,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
    isPrivate: true,
  })
);
