import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { HTTP_STATUS } from '../config/constants';
import logger from '../utils/logger';
import { config } from '../config/env';

/**
 * Global error handler middleware
 * Catches all errors and sends formatted response
 * Must be placed AFTER all routes
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error
  logger.error('Error occurred:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user?.userId || 'guest'
  });

  // Check if it's our custom API error
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      message: 'Validation error',
      errors: Object.values((err as any).errors).map((e: any) => ({
        field: e.path,
        message: e.message
      })),
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      message: `Invalid ${(err as any).path}: ${(err as any).value}`,
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle Mongoose duplicate key errors
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern)[0];
    res.status(HTTP_STATUS.CONFLICT).json({
      status: 'error',
      message: `${field} already exists`,
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: 'error',
      message: 'Invalid token',
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: 'error',
      message: 'Token expired',
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    });
    return;
  }

  // Default to 500 internal server error
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: config.nodeEnv === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(config.nodeEnv === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
};

/**
 * 404 Not Found handler
 * Use before error handler, after all routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`
  });
};