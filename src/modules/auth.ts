import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export interface userRequest extends Request {
    user?: JwtPayload | string;
}


declare const process: {
    env: {
        [key: string]: string;
    };
};


export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};


export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
};


export const createJWT = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        process.env.JWT_SECRET
    );

    return token;
};


export const protect = (
    req: userRequest,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not authorized!' });

        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401);
        res.json({ message: 'Not valid token!' });

        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: 'Not valid token!' });

        return;
    }
};