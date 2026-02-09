import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../utils/errors';
import { UserRole } from '../config/constants';

/**
 * Middleware to check if user has required role(s)
 * Must be used AFTER authenticate middleware
 * 
 * Usage:
 * app.get('/admin', authenticate, requireRole(['admin']), controller)
 * app.get('/stylist', authenticate, requireRole(['stylist', 'admin']), controller)
 */

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Check if user is authenticated (should be set by authenticate middleware)
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(req.user.role as UserRole)) {
        throw new ForbiddenError(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`
        );
      }

      // User has required role, continue
      next();
    } catch (error) {
      next(error);
    }
  };
};


/**
 * Middleware to check if user is admin
 * Shortcut for requireRole(['admin'])
 * 
 * Usage: app.delete('/users/:id', authenticate, requireAdmin, controller)
 */
export const requireAdmin = requireRole([UserRole.ADMIN]);

/**
 * Middleware to check if user is stylist or admin
 * 
 * Usage: app.get('/stylist/appointments', authenticate, requireStylist, controller)
 */
export const requireStylist = requireRole([UserRole.STYLIST, UserRole.ADMIN]);

/**
 * Middleware to check if user is customer (or admin)
 * 
 * Usage: app.get('/customer/profile', authenticate, requireCustomer, controller)
 */
export const requireCustomer = requireRole([UserRole.CUSTOMER, UserRole.ADMIN]);

/**
 * Middleware to check if user owns the resource or is admin
 * Useful for checking if user can modify their own data
 * 
 * Usage: app.patch('/users/:userId', authenticate, requireOwnerOrAdmin('userId'), controller)
 */
export const requireOwnerOrAdmin = (userIdParam: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      const resourceUserId = req.params[userIdParam];
      const currentUserId = req.user.userId;
      const isAdmin = req.user.role === UserRole.ADMIN;

      // Allow if user owns the resource OR is admin
      if (resourceUserId !== currentUserId && !isAdmin) {
        throw new ForbiddenError('You can only modify your own resources');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};