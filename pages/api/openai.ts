import type {NextApiRequest, NextApiResponse} from 'next';
import {createCompletion} from '../../lib/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') return createCompletion(req, res);
  return res.status(404);
}
