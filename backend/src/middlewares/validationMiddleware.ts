import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult, ValidationChain } from 'express-validator';
import { ValidationError } from '../utils/errors';
import { 
  isValidEmail, 
  isValidPhone, 
  isValidPassword, 
  isValidTime,
  isValidObjectId,
  isNotPastDate,
  isValidRating
} from '../utils/validators';

/**
 * Middleware to check validation results
 * Use after validation chains
 */
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg
    }));
    
    throw new ValidationError('Validation failed', formattedErrors);
  }
  
  next();
};

// ==================== USER VALIDATION ====================

/**
 * Validate user registration
 */
export const validateRegistration: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 5, max: 100 }).withMessage('Name must be 5-100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .custom(isValidEmail).withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .custom(isValidPhone).withMessage('Invalid phone number format'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .custom(isValidPassword).withMessage(
      'Password must be at least 8 characters with uppercase, lowercase, and number'
    ),
  
  body('confirmPassword')
    .notEmpty().withMessage('Password confirmation is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

/**
 * Validate user login
 */
export const validateLogin: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .custom(isValidEmail).withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// ==================== APPOINTMENT VALIDATION ====================

/**
 * Validate appointment creation
 */
export const validateAppointmentCreation: ValidationChain[] = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('customerEmail')
    .trim()
    .notEmpty().withMessage('Email is required')
    .custom(isValidEmail).withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('customerPhone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .custom(isValidPhone).withMessage('Invalid phone number'),
  
  body('serviceId')
    .notEmpty().withMessage('Service is required')
    .custom(isValidObjectId).withMessage('Invalid service ID'),
  
  body('stylistId')
    .notEmpty().withMessage('Stylist is required')
    .custom(isValidObjectId).withMessage('Invalid stylist ID'),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => isNotPastDate(new Date(value)))
    .withMessage('Cannot book appointments in the past'),
  
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .custom(isValidTime).withMessage('Invalid time format (use HH:mm)'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
];

/**
 * Validate appointment ID parameter
 */
export const validateAppointmentId: ValidationChain[] = [
  param('id')
    .custom(isValidObjectId).withMessage('Invalid appointment ID')
];

// ==================== REVIEW VALIDATION ====================

/**
 * Validate review creation
 */
export const validateReviewCreation: ValidationChain[] = [
  body('appointmentId')
    .notEmpty().withMessage('Appointment ID is required')
    .custom(isValidObjectId).withMessage('Invalid appointment ID'),
  
  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5')
    .custom(isValidRating).withMessage('Rating must be a whole number'),
  
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters')
];

// ==================== SERVICE VALIDATION ====================

/**
 * Validate service creation
 */
export const validateServiceCreation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be 3-100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Hair', 'Nails', 'Spa', 'Massage', 'Facial', 'Waxing', 'Makeup', 'Other'])
    .withMessage('Invalid category'),
  
  body('duration')
    .notEmpty().withMessage('Duration is required')
    .isInt({ min: 15, max: 480 }).withMessage('Duration must be 15-480 minutes')
    .custom((value) => value % 15 === 0).withMessage('Duration must be in 15-minute increments'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative')
];

/**
 * Validate service ID parameter
 */
export const validateServiceId: ValidationChain[] = [
  param('id')
    .custom(isValidObjectId).withMessage('Invalid service ID')
];

// ==================== STYLIST VALIDATION ====================

/**
 * Validate stylist creation
 */
export const validateStylistCreation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty().withMessage('Stylist name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  
  body('specialty')
    .isArray({ min: 1 }).withMessage('At least one specialty is required'),
  
  body('specialty.*')
    .trim()
    .notEmpty().withMessage('Specialty cannot be empty'),
  
  body('experience')
    .trim()
    .notEmpty().withMessage('Experience is required'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters')
];

/**
 * Validate stylist ID parameter
 */
export const validateStylistId: ValidationChain[] = [
  param('id')
    .custom(isValidObjectId).withMessage('Invalid stylist ID')
];

// ==================== QUERY VALIDATION ====================

/**
 * Validate pagination query params
 */
export const validatePagination: ValidationChain[] = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100')
    .toInt()
];

/**
 * Validate date range query params
 */
export const validateDateRange: ValidationChain[] = [
  query('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  query('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format')
];

/**
 * Validate status query param
 */
export const validateStatusQuery: ValidationChain[] = [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status')
];

// Export all validators as a single object for easy import
export const validators = {
  // User
  validateRegistration,
  validateLogin,
  
  // Appointment
  validateAppointmentCreation,
  validateAppointmentId,
  
  // Review
  validateReviewCreation,
  
  // Service
  validateServiceCreation,
  validateServiceId,
  
  // Stylist
  validateStylistCreation,
  validateStylistId,
  
  // Query
  validatePagination,
  validateDateRange,
  validateStatusQuery,
  
  // Validate middleware
  validate
};