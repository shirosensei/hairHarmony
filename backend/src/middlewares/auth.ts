import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    let token;

    if (req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

            const user = await User.findById(decoded.id).select('-password');

            if(!user) {
                return res.status(404).json({ msg: 'No user found with this id' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ msg: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ msg: 'Not authorized, no token' });
    }
}