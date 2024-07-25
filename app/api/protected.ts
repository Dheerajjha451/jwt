import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../middleware/auth';

function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: 'This is a protected route', user: (req as any).user });
}

export default function (req: NextApiRequest, res: NextApiResponse) {
    authMiddleware(req, res, () => handler(req, res));
}
