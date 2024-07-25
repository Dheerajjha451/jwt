import { NextApiRequest, NextApiResponse } from 'next';
import { decode_jwt, validate_jwt } from '@dheerajjha451/jwtd';

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    if (!validate_jwt(JWT_SECRET, token)) {
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const { id, payload, expires_at } = decode_jwt(JWT_SECRET, token);
        (req as any).user = { id, ...payload, expires_at };
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}
