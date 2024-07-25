import { encode_jwt } from '@dheerajjha451/jwtd';

const JWT_SECRET = process.env.JWT_SECRET!;

export function generateToken(id: string | number, payload: object, ttl?: number): string {
    return encode_jwt(JWT_SECRET, id, payload, ttl);
}
