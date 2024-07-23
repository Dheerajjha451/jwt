import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded; 
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}