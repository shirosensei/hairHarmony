import { Router, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { protect } from '../middlewares/auth';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

// Generate JWT token for user
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
}

router.post('/register', async (req: Request, res: Response): Promise<any> => {

    try {
        const { name, email, password, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: 'User already exists' });
        }


        const user = new User({
            name,
            email,
            password,
            role,
        });

        // Generate token 
        const token = generateToken(user._id as string);

        await user.save();

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ message: 'User registered successfully', user: userWithoutPassword, token });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(500).send('Server Error');
        }
    }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user._id as string);

        res.json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(500).send('Server Error');
        }
    }
});


router.get('/profile', protect, async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error', error);
            res.status(500).send('Server Error');
        }
    }
});

// Update user profile
// router.put('/profile', protect, async (req: Request, res: Response): Promise<any> => {
//     try {
//         const user = await User.findById(req.user.id);



export default router;