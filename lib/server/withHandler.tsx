import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: 'POST' | 'GET' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export function withHandler({
  method,
  handler,
  isPrivate = false,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Please, Log in' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error, '😈');
      return res.status(500).json({ error });
    }
  };
}
