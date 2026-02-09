import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.util';
import { UnauthorizedError } from '../utils/errors';
import { JwtPayload } from '../utils/jwt.util';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: string;
            };
        }
    }
}

/**
 * Middleware to verify JWT token and attach user to request
 * Usage: app.get('/protected', authenticate, controller)
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // 1. Extract token from Authorization header
        const token = extractTokenFromHeader(req.headers.authorization);

        if (!token) {
            throw new UnauthorizedError('Authentication token required');
        }

        // 2. Verify token
        let decoded: JwtPayload;

        try {
            decoded = verifyToken(token);
        } catch (error: any) {
            if (error.message === 'TOKEN_EXPIRED') {
                throw new UnauthorizedError('Your session has expired. Please login again');
            }
            if (error.message === 'INVALID_TOKEN') {
                throw new UnauthorizedError('Invalid authentication token');
            }
            throw new UnauthorizedError('Authentication failed');
        }

        // 3. Check if user still exists
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            throw new UnauthorizedError('User no longer exists');
        }

        // 4. Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedError('Your account has been deactivated');
        }

        // 5. Attach user to request object
        req.user = {
            userId: (user._id as any).toString(),
            email: user.email,
            role: user.role,
        };

        // 6. Continue to next middleware/controller
        next();
    } catch (error) {
        next(error);
    }
};

// export const protect = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization?.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

//             const user = await User.findById(decoded.id).select('-password');

//             if(!user) {
//                 return res.status(404).json({ msg: 'No user found with this id' });
//             }

//             req.user = user;
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401).json({ msg: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ msg: 'Not authorized, no token' });
//     }
// }
